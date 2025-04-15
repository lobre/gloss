"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import type { ColorModeConverter } from "./types"

interface DetailsProps {
  hue: number
  saturation: number
  lightness: number
  onChange?: (h: number, s: number, l: number) => void
  converter: ColorModeConverter
}

export function Details({ hue, saturation, lightness, onChange, converter }: DetailsProps) {
  const [localHue, setLocalHue] = useState<string>(hue.toString())
  const [localSaturation, setLocalSaturation] = useState<string>((saturation * 100).toString())
  const [localLightness, setLocalLightness] = useState<string>((lightness * 100).toString())

  // Update local state when props change
  useEffect(() => {
    // Only update if the new value is different from the current local value
    if (Math.round(hue).toString() !== localHue) {
      setLocalHue(Math.round(hue).toString())
    }
    if (Math.round(saturation * 100).toString() !== localSaturation) {
      setLocalSaturation(Math.round(saturation * 100).toString())
    }
    if (Math.round(lightness * 100).toString() !== localLightness) {
      setLocalLightness(Math.round(lightness * 100).toString())
    }
  }, [hue, saturation, lightness])

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalHue(value)
  }

  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalSaturation(value)
  }

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalLightness(value)
  }

  // Apply changes when input loses focus
  const handleInputBlur = () => {
    if (!onChange) return

    // Parse values, defaulting to 0 if empty or invalid
    const parsedHue = localHue === "" || isNaN(Number(localHue)) ? 0 : Number(localHue)
    const parsedSaturation = localSaturation === "" || isNaN(Number(localSaturation)) ? 0 : Number(localSaturation)
    const parsedLightness = localLightness === "" || isNaN(Number(localLightness)) ? 0 : Number(localLightness)

    // Clamp values to valid ranges
    const clampedHue = Math.max(0, Math.min(360, parsedHue))
    const clampedSaturation = Math.max(0, Math.min(100, parsedSaturation))
    const clampedLightness = Math.max(0, Math.min(100, parsedLightness))

    // Update local state with clamped values
    setLocalHue(clampedHue.toString())
    setLocalSaturation(clampedSaturation.toString())
    setLocalLightness(clampedLightness.toString())

    // Call onChange with normalized values
    onChange(clampedHue, clampedSaturation / 100, clampedLightness / 100)
  }

  return (
    <div className="flex gap-2 w-full items-center">
      <div className="flex items-center flex-1">
        <label htmlFor="hue-input" className="w-6 text-sm font-medium mr-1">
          H:
        </label>
        <Input
          id="hue-input"
          type="text"
          inputMode="numeric"
          min="0"
          max="360"
          value={localHue}
          onChange={handleHueChange}
          onBlur={handleInputBlur}
          className="w-full"
        />
        <span className="ml-1">°</span>
      </div>
      <div className="flex items-center flex-1">
        <label htmlFor="saturation-input" className="w-6 text-sm font-medium mr-1">
          S:
        </label>
        <Input
          id="saturation-input"
          type="text"
          inputMode="numeric"
          min="0"
          max="100"
          value={localSaturation}
          onChange={handleSaturationChange}
          onBlur={handleInputBlur}
          className="w-full"
        />
        <span className="ml-1">%</span>
      </div>
      <div className="flex items-center flex-1">
        <label htmlFor="lightness-input" className="w-6 text-sm font-medium mr-1">
          L:
        </label>
        <Input
          id="lightness-input"
          type="text"
          inputMode="numeric"
          min="0"
          max="100"
          value={localLightness}
          onChange={handleLightnessChange}
          onBlur={handleInputBlur}
          className="w-full"
        />
        <span className="ml-1">%</span>
      </div>
    </div>
  )
}
