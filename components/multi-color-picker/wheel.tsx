"use client"

import React from "react"
import { useRef, useState, useEffect } from "react"
import type { ColorModeConverter } from "./types"

interface HueSaturation {
  hue: number
  saturation: number
}

interface WheelProps {
  lightness: number
  hueSaturations: HueSaturation[]
  selected: number
  converter: ColorModeConverter
  onChange?: (hue: number, saturation: number, index: number) => void
  size?: number
}

export function Wheel({ lightness, hueSaturations = [], selected = 0, converter, onChange, size = 250 }: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // Use a single dragRef object instead of separate refs
  const dragRef = useRef<{
    active: boolean
    index: number | null
    startHue: number
    startSaturation: number
  }>({
    active: false,
    index: null,
    startHue: 0,
    startSaturation: 0,
  })

  const [isShiftPressed, setIsShiftPressed] = useState(false)
  const [isCtrlPressed, setIsCtrlPressed] = useState(false)

  // Add local state to buffer changes during dragging
  const [localHueSaturations, setLocalHueSaturations] = useState<HueSaturation[]>([])
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null)

  // Initialize local state when props change
  useEffect(() => {
    setLocalHueSaturations([...hueSaturations])
  }, [hueSaturations])

  // Calculate wheel properties
  const center = size / 2
  const radius = size / 2 - 10

  // Track keyboard modifiers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") setIsShiftPressed(true)
      if (e.key === "Control") setIsCtrlPressed(true)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") setIsShiftPressed(false)
      if (e.key === "Control") setIsCtrlPressed(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // Attach document-level event listeners when dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.active || dragRef.current.index === null) return

      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Calculate distance from center
      const dx = x - center
      const dy = y - center

      // Apply constraints based on keyboard modifiers
      let finalHue, finalSaturation

      if (isShiftPressed) {
        // When shift is pressed, constrain to the original hue angle
        // but allow movement along the full diameter (including through center)
        const originalAngle = dragRef.current.startHue * (Math.PI / 180)

        // Project the mouse position onto the line defined by the original angle
        const projectedDistance = dx * Math.cos(originalAngle) + dy * Math.sin(originalAngle)

        // Calculate new position along the diameter
        const newX = center + projectedDistance * Math.cos(originalAngle)
        const newY = center + projectedDistance * Math.sin(originalAngle)

        // Recalculate dx, dy from the projected point
        const newDx = newX - center
        const newDy = newY - center

        // Calculate distance from center for saturation
        const distance = Math.sqrt(newDx * newDx + newDy * newDy)

        // Determine if we're on the positive or negative side of the diameter
        const direction = Math.sign(projectedDistance)

        // Keep the original hue
        finalHue = dragRef.current.startHue

        // Saturation is distance / radius, but preserve the sign for direction
        finalSaturation = Math.min(1, distance / radius) * direction

        // If saturation is negative, flip the hue 180 degrees and make saturation positive
        if (finalSaturation < 0) {
          finalHue = (finalHue + 180) % 360
          finalSaturation = -finalSaturation
        }
      } else if (isCtrlPressed) {
        // Constrain to original saturation
        const distance = Math.sqrt(dx * dx + dy * dy)
        let angle = Math.atan2(dy, dx) * (180 / Math.PI)
        if (angle < 0) angle += 360

        finalHue = angle
        finalSaturation = dragRef.current.startSaturation
      } else {
        // No constraints - normal behavior
        const distance = Math.sqrt(dx * dx + dy * dy)
        let angle = Math.atan2(dy, dx) * (180 / Math.PI)
        if (angle < 0) angle += 360

        finalHue = angle
        finalSaturation = Math.min(1, distance / radius)
      }

      // Update local state
      const newLocalHueSaturations = [...localHueSaturations]
      newLocalHueSaturations[dragRef.current.index] = {
        hue: finalHue,
        saturation: finalSaturation,
      }
      setLocalHueSaturations(newLocalHueSaturations)
    }

    const handleMouseUp = () => {
      if (dragRef.current.active && dragRef.current.index !== null && onChange) {
        // Call onChange on mouseup with the final values
        const index = dragRef.current.index
        const { hue, saturation } = localHueSaturations[index]
        onChange(hue, saturation, index)
      }

      // Reset dragging state
      dragRef.current.active = false
      dragRef.current.index = null
      setActiveDragIndex(null)
    }

    // Only attach listeners when actively dragging
    if (dragRef.current.active) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragRef.current.active, localHueSaturations, isShiftPressed, isCtrlPressed, onChange])

  // Draw the color wheel when component mounts or props change
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const actualSize = Math.min(size, window.innerWidth - 40)
    canvas.width = actualSize
    canvas.height = actualSize

    // Calculate wheel properties
    const centerX = actualSize / 2
    const centerY = actualSize / 2
    const radius = actualSize / 2 - 10

    // Draw color wheel
    drawColorWheel(ctx, centerX, centerY, radius)
  }, [size, lightness, converter])

  // Draw color wheel
  const drawColorWheel = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
    // Clear the canvas
    ctx.clearRect(0, 0, centerX * 2, centerY * 2)

    // Create image data
    const imageData = ctx.createImageData(centerX * 2, centerY * 2)
    const data = imageData.data

    // Use a chunked approach to avoid UI thread blocking
    const renderChunk = (startY: number, endY: number) => {
      for (let y = startY; y < endY; y++) {
        for (let x = 0; x < centerX * 2; x++) {
          // Calculate distance from center
          const dx = x - centerX
          const dy = y - centerY
          const distance = Math.sqrt(dx * dx + dy * dy)

          // If within radius, calculate and set color
          if (distance <= radius) {
            // Calculate hue (angle)
            let angle = Math.atan2(dy, dx) * (180 / Math.PI)
            if (angle < 0) angle += 360

            // Calculate saturation (distance from center)
            const saturation = distance / radius

            // Get RGB values using the converter
            const rgb = converter.toRgb(angle / 360, saturation, lightness)

            // Set pixel color
            const index = (y * centerX * 2 + x) * 4
            data[index] = rgb[0] // R
            data[index + 1] = rgb[1] // G
            data[index + 2] = rgb[2] // B
            data[index + 3] = 255 // A (fully opaque)
          }
        }
      }
    }

    // Split the rendering into chunks
    const chunkSize = 50
    for (let y = 0; y < centerY * 2; y += chunkSize) {
      renderChunk(y, Math.min(y + chunkSize, centerY * 2))
    }

    // Put the image data on the canvas
    ctx.putImageData(imageData, 0, 0)

    // Draw a circle border
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "#ccc"
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Calculate marker positions
  const calculateMarkerPosition = (hue: number, saturation: number) => {
    const angle = hue * (Math.PI / 180)
    const distance = saturation * radius

    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    }
  }

  // Handle mouse down on wheel or marker
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if we're clicking on a marker
    const markerIndex = findClickedMarker(e)
    if (markerIndex !== null && markerIndex < hueSaturations.length) {
      // Start dragging this marker
      dragRef.current.active = true
      dragRef.current.index = markerIndex
      setActiveDragIndex(markerIndex)

      // Store initial values for constraint calculations
      const { hue, saturation } = hueSaturations[markerIndex]
      dragRef.current.startHue = hue
      dragRef.current.startSaturation = saturation
      return
    }

    // Otherwise, check if we're clicking on the wheel
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate distance from center
    const dx = x - center
    const dy = y - center
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Only process clicks inside the wheel
    if (distance <= radius) {
      // Calculate hue (angle)
      let angle = Math.atan2(dy, dx) * (180 / Math.PI)
      if (angle < 0) angle += 360

      // Calculate saturation (distance from center)
      const saturation = Math.min(1, distance / radius)

      // Start dragging the selected marker
      dragRef.current.active = true
      dragRef.current.index = selected
      setActiveDragIndex(selected)

      // Store initial values for constraint calculations
      dragRef.current.startHue = angle
      dragRef.current.startSaturation = saturation

      // Update local state immediately
      const newLocalHueSaturations = [...localHueSaturations]
      newLocalHueSaturations[selected] = { hue: angle, saturation }
      setLocalHueSaturations(newLocalHueSaturations)
    }
  }

  // Find which marker was clicked
  const findClickedMarker = (e: React.MouseEvent): number | null => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return null

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Check each marker
    for (let i = 0; i < hueSaturations.length; i++) {
      const { hue, saturation } = hueSaturations[i]
      const pos = calculateMarkerPosition(hue, saturation)

      const dx = mouseX - pos.x
      const dy = mouseY - pos.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // If within 10px of the marker, consider it clicked
      if (distance <= 10) {
        return i
      }
    }

    return null
  }

  // Get the current position for each marker
  const getMarkerPosition = (index: number) => {
    // Use local state for the active drag marker, otherwise use props
    const hs = activeDragIndex === index ? localHueSaturations[index] : hueSaturations[index]
    return calculateMarkerPosition(hs.hue, hs.saturation)
  }

  return (
    <div ref={containerRef} className="relative">
      <canvas ref={canvasRef} className="rounded-full cursor-pointer" />

      {/* Transparent overlay for mouse events */}
      <div className="absolute inset-0 rounded-full" onMouseDown={handleMouseDown} />

      {/* Color markers */}
      {hueSaturations.map((hs, index) => {
        const pos = getMarkerPosition(index)
        const isSelected = index === selected

        // Use local state for the active drag marker, otherwise use props
        const displayHs = activeDragIndex === index ? localHueSaturations[index] : hs

        return (
          <div
            key={index}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full ${
              isSelected ? "z-20" : "z-10"
            }`}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: isSelected ? "20px" : "16px",
              height: isSelected ? "20px" : "16px",
              backgroundColor: converter.toHex(displayHs.hue / 360, displayHs.saturation, lightness),
              border: isSelected ? "3px solid white" : "2px solid rgba(255,255,255,0.7)",
              boxShadow: isSelected
                ? "0 0 0 2px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)"
                : "0 0 0 1px rgba(0,0,0,0.2)",
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              dragRef.current.active = true
              dragRef.current.index = index
              setActiveDragIndex(index)
              dragRef.current.startHue = hs.hue
              dragRef.current.startSaturation = hs.saturation
            }}
          />
        )
      })}
    </div>
  )
}
