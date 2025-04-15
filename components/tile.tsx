"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import type { TileType } from "@/lib/types"
import { getContrastColor } from "@/lib/contrast"

interface TileProps {
  tile: TileType
  isSelected: boolean
  isDragging?: boolean
  backgroundColor: string
  onClick: (e: React.MouseEvent) => void
  onDragStart: (e: React.MouseEvent) => void
}

export function Tile({ tile, isSelected, isDragging = false, backgroundColor, onClick, onDragStart }: TileProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const tooltipTimerRef = useRef<NodeJS.Timeout | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const { id, label, description, color, x, y, width, height } = tile

  // Determine text color based on background for contrast
  const textColor = getContrastColor(backgroundColor)

  // Determine outline color based on background
  const outlineColor = getContrastColor(backgroundColor)

  // Determine tooltip colors
  const tooltipBgColor = textColor === "#ffffff" ? "#ffffff" : "#333333"
  const tooltipTextColor = textColor === "#ffffff" ? "#333333" : "#ffffff"

  // Handle hover with delay and mouse position
  useEffect(() => {
    if (isHovering && !isDragging && description.trim() !== "") {
      // Show tooltip after 1000ms (1 second) delay
      tooltipTimerRef.current = setTimeout(() => {
        setShowTooltip(true)
      }, 1000)
    } else {
      // Clear timer and hide tooltip
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current)
        tooltipTimerRef.current = null
      }
      setShowTooltip(false)
    }

    return () => {
      // Clean up timer on unmount
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current)
      }
    }
  }, [isHovering, isDragging, description])

  // Handle mouse enter/leave
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  // Update tooltip position on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({
      x: e.clientX,
      y: e.clientY,
    })
  }

  return (
    <>
      {/* Label above tile - non-selectable */}
      <div
        className="absolute text-center text-sm select-none"
        style={{
          left: `${x}px`,
          top: `${y - 20}px`,
          width: `${width}px`,
          color: textColor,
        }}
      >
        {label}
      </div>

      {/* Tile */}
      <div
        className="absolute cursor-move flex items-center justify-center select-none rounded-lg"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: color,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          outline: isSelected ? `2px solid ${outlineColor}` : "none",
          outlineOffset: "2px",
          zIndex: isDragging ? 20 : isSelected ? 10 : 1,
        }}
        onClick={onClick}
        onMouseDown={onDragStart}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />

      {/* Tooltip - positioned with bottom at cursor position */}
      {showTooltip && description.trim() !== "" && (
        <div
          ref={tooltipRef}
          className="fixed z-50 p-2 rounded-lg shadow-lg text-sm"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 10}px`, // Position above cursor with small gap
            transform: "translate(-50%, -100%)", // Center horizontally and position bottom at cursor
            backgroundColor: tooltipBgColor,
            color: tooltipTextColor,
            borderRadius: "8px",
            maxWidth: "250px",
            pointerEvents: "none", // Ensure tooltip doesn't interfere with mouse events
          }}
        >
          {description}
        </div>
      )}
    </>
  )
}
