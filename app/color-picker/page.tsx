"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MultiColorPicker } from "@/components/multi-color-picker/picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

export default function ColorPickerTest() {
  const [colorCount, setColorCount] = useState(3)
  const [colors, setColors] = useState(["#ff5500", "#3366cc", "#66cc33"])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationResolve, setConfirmationResolve] = useState<((value: boolean) => void) | null>(null)

  // Generate default colors when count changes
  const handleColorCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number.parseInt(e.target.value)
    if (!isNaN(count) && count >= 1 && count <= 10) {
      setColorCount(count)
      updateColorCount(count)
    }
  }

  // Update colors array based on count
  const updateColorCount = (count: number) => {
    // Generate new colors array with default colors
    const defaultColors = [
      "#ff5500",
      "#3366cc",
      "#66cc33",
      "#ff9900",
      "#9933cc",
      "#33cc99",
      "#cc3366",
      "#999933",
      "#3399cc",
      "#cc6633",
    ]

    const newColors = Array(count)
      .fill(0)
      .map((_, i) => {
        return i < defaultColors.length
          ? defaultColors[i]
          : "#" +
              Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")
      })

    setColors(newColors)
  }

  // Effect to ensure colors array length matches colorCount
  useEffect(() => {
    if (colors.length !== colorCount) {
      updateColorCount(colorCount)
    }
  }, [colorCount, colors.length])

  const handleConfirmNormalization = () => {
    return new Promise<boolean>((resolve) => {
      setShowConfirmation(true)
      setConfirmationResolve(() => resolve)
    })
  }

  const handleConfirmationResponse = (confirmed: boolean) => {
    setShowConfirmation(false)
    if (confirmationResolve) {
      confirmationResolve(confirmed)
      setConfirmationResolve(null)
    }
  }

  return (
    <div className="container mx-auto p-8 flex flex-col items-start">
      <h1 className="text-2xl font-bold mb-6">Multi-Color Picker</h1>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="color-count">Number of colors:</Label>
            <Input
              id="color-count"
              type="number"
              min="1"
              max="10"
              value={colorCount}
              onChange={handleColorCountChange}
              className="w-20"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newCount = Math.max(1, colorCount - 1)
                setColorCount(newCount)
                updateColorCount(newCount)
              }}
            >
              -
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newCount = Math.min(10, colorCount + 1)
                setColorCount(newCount)
                updateColorCount(newCount)
              }}
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md bg-white rounded-lg shadow-lg">
        <MultiColorPicker 
          colors={colors} 
          onChange={setColors} 
          defaultColorSpace="hsl" 
          defaultMode="wheel" 
          confirmNormalization={handleConfirmNormalization}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Selected Colors ({colors.length}):</h2>
        <div className="flex flex-wrap gap-4">
          {colors.map((color, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-md shadow-md" style={{ backgroundColor: color }} />
              <span className="mt-2 text-sm font-mono">{color}</span>
            </div>
          ))}
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => handleConfirmationResponse(false)}
        onConfirm={() => handleConfirmationResponse(true)}
        title="Confirm Color Normalization"
        message="Colors will be changed due to the constraints of the multi color picker. Are you sure you want to proceed?"
      />
    </div>
  )
}
