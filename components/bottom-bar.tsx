"use client"

import { calculateContrastRatio } from "@/lib/contrast"

interface BottomBarProps {
  color1?: string
  color2?: string
}

export function BottomBar({ color1, color2 }: BottomBarProps) {
  // If we don't have two colors, don't show anything
  if (!color1 || !color2) {
    return null
  }

  // Calculate contrast ratio
  const contrastRatio = calculateContrastRatio(color1, color2)

  return (
    <div className="h-14 border-t bg-white flex items-center px-4 gap-4">
      {/* Color samples */}
      <div className="flex h-8 w-32 rounded overflow-hidden">
        <div
          className="flex-1 flex items-center justify-center"
          style={{
            backgroundColor: color1,
            color: color2,
          }}
        >
          <span className="text-xs">Sample</span>
        </div>
        <div
          className="flex-1 flex items-center justify-center"
          style={{
            backgroundColor: color2,
            color: color1,
          }}
        >
          <span className="text-xs">Sample</span>
        </div>
      </div>

      {/* Contrast ratio */}
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">Contrast:</span>
        <span className="text-sm font-bold">{contrastRatio.toFixed(2)}:1</span>
      </div>

      {/* WCAG AA */}
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">WCAG AA:</span>
        <span className={`text-sm font-medium ${contrastRatio >= 4.5 ? "text-green-600" : "text-red-600"}`}>
          {contrastRatio >= 4.5 ? "Pass" : "Fail"}
        </span>
      </div>

      {/* WCAG AAA */}
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">WCAG AAA:</span>
        <span className={`text-sm font-medium ${contrastRatio >= 7 ? "text-green-600" : "text-red-600"}`}>
          {contrastRatio >= 7 ? "Pass" : "Fail"}
        </span>
      </div>
    </div>
  )
}
