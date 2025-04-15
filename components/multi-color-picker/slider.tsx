"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import type { ColorModeConverter } from "./types"

interface SliderProps {
  hue: number
  saturation: number
  lightnesses: number[]
  selected: number
  converter: ColorModeConverter
  onChange?: (lightness: number, index: number) => void
}

export function Slider({ hue, saturation, lightnesses = [], selected = 0, converter, onChange }: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  // Use a single dragRef object instead of separate refs
  const dragRef = useRef<{ active: boolean; index: number | null }>({ active: false, index: null })

  // Add local state to buffer changes during dragging
  const [localLightnesses, setLocalLightnesses] = useState<number[]>([])
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null)

  // Initialize local state when props change
  useEffect(() => {
    setLocalLightnesses([...lightnesses])
  }, [lightnesses])

  // Attach document-level event listeners when dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.active || dragRef.current.index === null) return

      const slider = sliderRef.current
      if (!slider) return

      const rect = slider.getBoundingClientRect()
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
      const width = rect.width

      // Calculate lightness (0 to 1)
      const newLightness = Math.max(0, Math.min(1, x / width))

      // Update local state
      const newLocalLightnesses = [...localLightnesses]
      newLocalLightnesses[dragRef.current.index] = newLightness
      setLocalLightnesses(newLocalLightnesses)
    }

    const handleMouseUp = () => {
      if (dragRef.current.active && dragRef.current.index !== null && onChange) {
        // Call onChange on mouseup with the final values
        onChange(localLightnesses[dragRef.current.index], dragRef.current.index)
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
  }, [dragRef.current.active, localLightnesses, onChange])

  // Handle mouse down on slider
  const handleMouseDown = (e: React.MouseEvent) => {
    // Check if we're clicking on a lightness marker
    const lightIndex = findClickedLightness(e)
    if (lightIndex !== null) {
      // Start dragging this marker
      dragRef.current.active = true
      dragRef.current.index = lightIndex
      setActiveDragIndex(lightIndex)
      return
    }

    // Otherwise, update the selected lightness
    const slider = sliderRef.current
    if (!slider) return

    const rect = slider.getBoundingClientRect()
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
    const width = rect.width

    // Calculate lightness (0 to 1)
    const newLightness = Math.max(0, Math.min(1, x / width))

    // Start dragging the selected marker
    dragRef.current.active = true
    dragRef.current.index = selected
    setActiveDragIndex(selected)

    // Update local state immediately
    const newLocalLightnesses = [...localLightnesses]
    newLocalLightnesses[selected] = newLightness
    setLocalLightnesses(newLocalLightnesses)
  }

  // Find which lightness marker was clicked
  const findClickedLightness = (e: React.MouseEvent): number | null => {
    const slider = sliderRef.current
    if (!slider) return null

    const rect = slider.getBoundingClientRect()
    const mouseX = e.clientX - rect.left

    // Check each lightness marker
    for (let i = 0; i < lightnesses.length; i++) {
      const lightX = lightnesses[i] * rect.width
      const distance = Math.abs(mouseX - lightX)

      // If within 10px of the lightness marker, consider it clicked
      if (distance <= 10) {
        return i
      }
    }

    return null
  }

  // Generate gradient colors for the slider
  const generateGradient = () => {
    const steps = 10
    let gradient = ""

    for (let i = 0; i <= steps; i++) {
      const l = i / steps
      const color = converter.toHex(hue / 360, saturation, l)
      const percentage = (i / steps) * 100
      gradient += `${color} ${percentage}%`
      if (i < steps) gradient += ", "
    }

    return `linear-gradient(to right, ${gradient})`
  }

  return (
    <div className="mt-4 relative w-full">
      <div
        ref={sliderRef}
        className="h-8 rounded-lg cursor-pointer w-full"
        style={{
          background: generateGradient(),
        }}
        onMouseDown={handleMouseDown}
      />

      {/* Lightness markers */}
      {lightnesses.map((lightness, index) => {
        const isSelected = index === selected

        // Use local state for the active drag marker, otherwise use props
        const currentLightness = activeDragIndex === index ? localLightnesses[index] : lightness

        return (
          <div
            key={index}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none ${
              isSelected ? "z-20" : "z-10"
            }`}
            style={{
              left: `${currentLightness * 100}%`,
              top: "50%",
              width: isSelected ? "12px" : "10px",
              height: isSelected ? "32px" : "28px",
              backgroundColor: converter.toHex(hue / 360, saturation, currentLightness),
              border: isSelected ? "3px solid white" : "2px solid rgba(255,255,255,0.7)",
              boxShadow: isSelected
                ? "0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)"
                : "0 0 0 1px rgba(0,0,0,0.2)",
            }}
          />
        )
      })}
    </div>
  )
}
