"use client"

import { useState, useEffect, useMemo } from "react"
import { Wheel } from "./wheel"
import { Slider } from "./slider"
import { Details } from "./details"
import { Hex } from "./hex"
import { hslToHex, okhslToHex, hexToHsl, hexToOkhsl, hslToRgb, okhslToSrgb } from "./color-convert"
import { areColorArraysEqual, haveSameLightness, haveSameHueAndSaturation } from "./color-utils"
import type { ColorSpace, MultiColorPickerProps, PickerMode, ColorModeConverter } from "./types"
import { useToast } from "@/components/ui/toast"
import { GitCommitHorizontal, Circle, Maximize2, ShrinkIcon } from "lucide-react"
import { Button } from '@/components/ui'

// Import from the correct toggle component
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle"

export function MultiColorPicker({
  colors = [],
  onChange,
  defaultColorSpace = "hsl",
  defaultMode = "wheel",
  confirmNormalization,
}: MultiColorPickerProps) {
  // Core state - keep this minimal
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [colorSpace, setColorSpace] = useState<ColorSpace>(defaultColorSpace)
  const [mode, setMode] = useState<PickerMode>(defaultMode)

  // Default color if none provided
  const safeColors = useMemo(() => {
    return colors.length > 0 ? colors : ["#ff0000"]
  }, [colors])

  // Generate random value between min and max
  const randomBetween = (min: number, max: number) => {
    return min + Math.random() * (max - min)
  }

  // Create color converters for each color space
  const converters = useMemo(() => {
    return {
      hsl: {
        toHex: (h: number, s: number, l: number) => hslToHex(h, s, l),
        toRgb: (h: number, s: number, l: number) => hslToRgb(h, s, l),
      } as ColorModeConverter,
      okhsl: {
        toHex: (h: number, s: number, l: number) => okhslToHex(h, s, l),
        toRgb: (h: number, s: number, l: number) => okhslToSrgb(h, s, l),
      } as ColorModeConverter,
    }
  }, [])

  // Get the current converter based on color space
  const currentConverter = useMemo(() => {
    return converters[colorSpace]
  }, [colorSpace, converters])

  // Detect color space and mode based on provided colors
  const detectColorSpaceAndMode = () => {
    if (safeColors.length <= 1) {
      return { detectedColorSpace: defaultColorSpace, detectedMode: defaultMode }
    }

    // Check HSL color space conditions
    const hasSameLightnessHSL = safeColors.every((color) => 
      haveSameLightness(color, safeColors[0], 'hsl')
    )
    const hasSameHueAndSatHSL = safeColors.every((color) => 
      haveSameHueAndSaturation(color, safeColors[0], 'hsl')
    )

    // Check OKHSL color space conditions
    const hasSameLightnessOKHSL = safeColors.every((color) => 
      haveSameLightness(color, safeColors[0], 'okhsl')
    )
    const hasSameHueAndSatOKHSL = safeColors.every((color) => 
      haveSameHueAndSaturation(color, safeColors[0], 'okhsl')
    )

    // Determine color space and mode based on all conditions
    if (hasSameLightnessHSL) {
      return { detectedColorSpace: 'hsl' as ColorSpace, detectedMode: 'wheel' as PickerMode }
    }
    if (hasSameHueAndSatHSL) {
      return { detectedColorSpace: 'hsl' as ColorSpace, detectedMode: 'slider' as PickerMode }
    }
    if (hasSameLightnessOKHSL) {
      return { detectedColorSpace: 'okhsl' as ColorSpace, detectedMode: 'wheel' as PickerMode }
    }
    if (hasSameHueAndSatOKHSL) {
      return { detectedColorSpace: 'okhsl' as ColorSpace, detectedMode: 'slider' as PickerMode }
    }

    // Default to provided defaults if no clear pattern is detected
    return { detectedColorSpace: defaultColorSpace, detectedMode: defaultMode }
  }

  // Modify the normalizeColors function to accept mode and colorSpace parameters
  const normalizeColors = (randomize = false, currentMode = mode, currentColorSpace = colorSpace) => {
    const selectedColor = safeColors[selectedIndex]
    const selectedValues = currentColorSpace === "hsl" ? hexToHsl(selectedColor) : hexToOkhsl(selectedColor)
    if (!selectedValues) return safeColors

    const newColors = [...safeColors]

    for (let i = 0; i < newColors.length; i++) {
      if (i === selectedIndex) {
        continue // Skip processing the selected color
      }

      const values = currentColorSpace === "hsl" ? hexToHsl(newColors[i]) : hexToOkhsl(newColors[i])
      if (!values) continue

      if (currentMode === "wheel") {
        // In wheel mode, all colors share the same lightness
        const hue = randomize ? randomBetween(0, 1) : values[0]
        const saturation = randomize ? randomBetween(0.3, 1) : values[1]

        newColors[i] =
          currentColorSpace === "hsl"
            ? hslToHex(hue, saturation, selectedValues[2])
            : okhslToHex(hue, saturation, selectedValues[2])
      } else if (currentMode === "slider") {
        // In slider mode, all colors share the same hue/saturation
        const lightness = randomize ? randomBetween(0.2, 0.8) : values[2]

        newColors[i] =
          currentColorSpace === "hsl"
            ? hslToHex(selectedValues[0], selectedValues[1], lightness)
            : okhslToHex(selectedValues[0], selectedValues[1], lightness)
      }
    }

    return newColors
  }

  // Initialize color space and mode based on provided colors
  useEffect(() => {
    if (safeColors.length <= 1) return

    const { detectedColorSpace, detectedMode } = detectColorSpaceAndMode()

    // Normalize colors without randomization during initialization
    const normalizedColors = normalizeColors(false, detectedMode, detectedColorSpace)

    if (!areColorArraysEqual(normalizedColors, safeColors, detectedColorSpace)) {
      const shouldNormalize = confirmNormalization ? confirmNormalization('initialization') : Promise.resolve(true)
      shouldNormalize.then((confirmed) => {
        if (confirmed) {
          setColorSpace(detectedColorSpace)
          setMode(detectedMode)
          if (onChange) {
            // Preserve the order of colors to maintain selection order
            const orderedNormalizedColors = safeColors.map((_, i) => normalizedColors[i])
            onChange(orderedNormalizedColors, true) // Force reset history on initialization
          }
        } else {
          // If normalization is rejected, keep the original colors
          if (onChange) {
            onChange(safeColors, false)
          }
        }
      })
    } else {
      setColorSpace(detectedColorSpace)
      setMode(detectedMode)
    }
  }, [safeColors.length]) // Only run when number of colors changes

  // Ensure selected index is valid
  useEffect(() => {
    if (selectedIndex >= safeColors.length) {
      setSelectedIndex(0)
    }
  }, [safeColors, selectedIndex])

  // Get the selected color
  const selectedColor = safeColors[selectedIndex]

  // Derive HSL values from the selected color
  const { hue, saturation, lightness } = useMemo(() => {
    const values = colorSpace === "hsl" ? hexToHsl(selectedColor) : hexToOkhsl(selectedColor)
    return {
      hue: values ? values[0] * 360 : 0,
      saturation: values ? values[1] : 0,
      lightness: values ? values[2] : 0,
    }
  }, [selectedColor, colorSpace])

  // Derive hueSaturations and lightnesses based on mode and colors
  const { hueSaturations, lightnesses } = useMemo(() => {
    if (mode === "wheel") {
      // In wheel mode, all colors share the same lightness
      const hueSats = safeColors.map((color) => {
        const values = colorSpace === "hsl" ? hexToHsl(color) : hexToOkhsl(color)
        return {
          hue: values ? values[0] * 360 : 0,
          saturation: values ? values[1] : 0,
        }
      })

      return {
        hueSaturations: hueSats,
        lightnesses: [lightness], // Single lightness value
      }
    } else {
      // In slider mode, all colors share the same hue/saturation
      const lights = safeColors.map((color) => {
        const values = colorSpace === "hsl" ? hexToHsl(color) : hexToOkhsl(color)
        return values ? values[2] : 0
      })

      return {
        hueSaturations: [{ hue, saturation }], // Single hue/saturation pair
        lightnesses: lights,
      }
    }
  }, [safeColors, mode, colorSpace, hue, saturation, lightness])

  const { showToast, ToastContainer } = useToast()

  // Handle wheel color selection
  const handleWheelColorChange = (h: number, s: number, index: number) => {
    if (mode === "wheel") {
      // In wheel mode, update the specific color
      const newColors = [...safeColors]
      const l = lightnesses[0]
      newColors[index] = currentConverter.toHex(h / 360, s, l)

      // Update selected index
      setSelectedIndex(index)

      // Notify parent
      if (onChange) {
        onChange(newColors)
      }
    } else {
      // In slider mode, update all colors with the new hue/saturation
      const newColors = safeColors.map((_, i) => {
        const l = lightnesses[i]
        return currentConverter.toHex(h / 360, s, l)
      })

      // Notify parent
      if (onChange) {
        onChange(newColors)
      }
    }
  }

  // Handle lightness change
  const handleLightnessChange = (l: number, index: number) => {
    if (mode === "slider") {
      // In slider mode, update the specific color
      const newColors = [...safeColors]
      const { hue, saturation } = hueSaturations[0]
      newColors[index] = currentConverter.toHex(hue / 360, saturation, l)

      // Update selected index
      setSelectedIndex(index)

      // Notify parent
      if (onChange) {
        onChange(newColors)
      }
    } else {
      // In wheel mode, update all colors with the new lightness
      const newColors = safeColors.map((_, i) => {
        const { hue, saturation } = hueSaturations[i]
        return currentConverter.toHex(hue / 360, saturation, l)
      })

      // Notify parent
      if (onChange) {
        onChange(newColors)
      }
    }
  }

  // Handle hex value editing
  const handleHexChange = (hex: string) => {
    const newColors = [...safeColors]
    newColors[selectedIndex] = hex

    // Notify parent
    if (onChange) {
      onChange(newColors)
    }
  }

  // Handle HSL value changes
  const handleHslChange = (h: number, s: number, l: number) => {
    const newColor = currentConverter.toHex(h / 360, s, l)
    const newColors = [...safeColors]
    newColors[selectedIndex] = newColor

    // Notify parent
    if (onChange) {
      onChange(newColors)
    }
  }

  // Handle mode switching
  const handleModeChange = async (newMode: PickerMode) => {
    const normalizedColors = normalizeColors(true, newMode, colorSpace)

    if (!areColorArraysEqual(normalizedColors, safeColors, colorSpace)) {
      const shouldNormalize = confirmNormalization ? confirmNormalization('modeChange') : Promise.resolve(true)
      const confirmed = await shouldNormalize
      if (confirmed) {
        setMode(newMode)
        if (onChange) {
          onChange(normalizedColors, false) // Don't force reset history during mode change
        }
      }
    } else {
      setMode(newMode)
    }
  }

  // Handle color space change
  const handleColorSpaceChange = async (newSpace: ColorSpace) => {
    const normalizedColors = normalizeColors(false, mode, newSpace)

    if (!areColorArraysEqual(normalizedColors, safeColors, newSpace)) {
      const shouldNormalize = confirmNormalization ? confirmNormalization('colorSpaceChange') : Promise.resolve(true)
      const confirmed = await shouldNormalize
      if (confirmed) {
        setColorSpace(newSpace)
        if (onChange) {
          onChange(normalizedColors, false) // Don't force reset history during color space change
        }
      }
    } else {
      setColorSpace(newSpace)
    }
  }

  // Copy color to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(selectedColor)
      .then(() => {
        showToast("Color copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy color: ", err)
      })
  }

  // Spread hues evenly
  const spreadHue = () => {
    if (safeColors.length <= 1) return

    try {
      const selectedValues = colorSpace === "hsl" ? hexToHsl(selectedColor) : hexToOkhsl(selectedColor)
      if (!selectedValues) return

      const refSaturation = selectedValues[1]
      const refLightness = selectedValues[2]
      const startHue = selectedValues[0] * 360
      const step = 360 / safeColors.length

      const newColors = [...safeColors]

      for (let i = 0; i < newColors.length; i++) {
        if (i === selectedIndex) continue

        const newHue = (startHue + step * (i - selectedIndex) + 360) % 360
        newColors[i] = currentConverter.toHex(newHue / 360, refSaturation, refLightness)
      }

      if (onChange) {
        onChange(newColors)
      }

      showToast("Hues spread evenly")
    } catch (error) {
      console.error("Error spreading hues:", error)
    }
  }

  // Spread saturation evenly
  const spreadSaturation = () => {
    if (safeColors.length <= 1) return

    try {
      const selectedValues = colorSpace === "hsl" ? hexToHsl(selectedColor) : hexToOkhsl(selectedColor)
      if (!selectedValues) return

      const refHue = selectedValues[0]
      const refLightness = selectedValues[2]

      // Find min and max saturation from current colors
      let minSat = 1
      let maxSat = 0

      // Find the actual min and max saturation values
      safeColors.forEach((color) => {
        const values = colorSpace === "hsl" ? hexToHsl(color) : hexToOkhsl(color)
        if (values) {
          minSat = Math.min(minSat, values[1])
          maxSat = Math.max(maxSat, values[1])
        }
      })

      // Ensure we have a reasonable range
      if (maxSat - minSat < 0.1) {
        minSat = Math.max(0.1, minSat - 0.05)
        maxSat = Math.min(0.9, maxSat + 0.05)
      }

      // Sort indices by current saturation
      const indices = Array.from({ length: safeColors.length }, (_, i) => i)
      indices.sort((a, b) => {
        const valuesA = colorSpace === "hsl" ? hexToHsl(safeColors[a]) : hexToOkhsl(safeColors[a])
        const valuesB = colorSpace === "hsl" ? hexToHsl(safeColors[b]) : hexToOkhsl(safeColors[b])
        return (valuesA?.[1] || 0) - (valuesB?.[1] || 0)
      })

      const step = (maxSat - minSat) / (safeColors.length - 1)
      const newColors = [...safeColors]

      // Apply new saturation values
      for (let i = 0; i < indices.length; i++) {
        const index = indices[i]
        const newSat = minSat + step * i
        newColors[index] = currentConverter.toHex(refHue, newSat, refLightness)
      }

      if (onChange) {
        onChange(newColors)
      }

      showToast("Saturation spread evenly")
    } catch (error) {
      console.error("Error spreading saturation:", error)
    }
  }

  // Spread lightness evenly
  const spreadLightness = () => {
    if (safeColors.length <= 1) return

    try {
      // Find min and max lightness values
      let minLight = 1
      let maxLight = 0

      // Find the actual min and max lightness values
      safeColors.forEach((color) => {
        const values = colorSpace === "hsl" ? hexToHsl(color) : hexToOkhsl(color)
        if (values) {
          minLight = Math.min(minLight, values[2])
          maxLight = Math.max(maxLight, values[2])
        }
      })

      // Ensure we have a reasonable range
      if (maxLight - minLight < 0.1) {
        minLight = Math.max(0.1, minLight - 0.05)
        maxLight = Math.min(0.9, maxLight + 0.05)
      }

      // Sort indices by current lightness
      const indices = Array.from({ length: safeColors.length }, (_, i) => i)
      indices.sort((a, b) => {
        const valuesA = colorSpace === "hsl" ? hexToHsl(safeColors[a]) : hexToOkhsl(safeColors[a])
        const valuesB = colorSpace === "hsl" ? hexToHsl(safeColors[b]) : hexToOkhsl(safeColors[b])
        return (valuesA?.[2] || 0) - (valuesB?.[2] || 0)
      })

      const step = (maxLight - minLight) / (safeColors.length - 1)
      const newColors = [...safeColors]

      // Apply new lightness values
      for (let i = 0; i < indices.length; i++) {
        const index = indices[i]
        const values = colorSpace === "hsl" ? hexToHsl(safeColors[index]) : hexToOkhsl(safeColors[index])

        if (values) {
          const newLight = minLight + step * i
          newColors[index] = currentConverter.toHex(values[0], values[1], newLight)
        }
      }

      if (onChange) {
        onChange(newColors)
      }

      showToast("Lightness spread evenly")
    } catch (error) {
      console.error("Error spreading lightness:", error)
    }
  }

  // Only show mode buttons and spread buttons if we have multiple colors
  const showModeButtons = safeColors.length > 1
  const canSpreadHue = safeColors.length > 1
  const canSpreadSaturationLightness = safeColors.length > 2

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="flex w-full justify-between items-center mb-4">
        <div className={`flex ${!showModeButtons ? "mx-auto" : ""}`}>
          <ToggleGroup
            type="single"
            value={colorSpace}
            onValueChange={(value) => {
              if (value) handleColorSpaceChange(value as ColorSpace)
            }}
            size="sm"
            variant="outline"
            className="bg-gray-100"
          >
            <ToggleGroupItem 
              value="hsl" 
              className="rounded-r-none h-8 px-3 data-[state=on]:bg-gray-900 data-[state=on]:text-white"
            >
              <span className="text-xs">HSL</span>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="okhsl" 
              className="rounded-l-none h-8 px-3 data-[state=on]:bg-gray-900 data-[state=on]:text-white"
            >
              <span className="text-xs">OKHSL</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {showModeButtons && (
          <div className="flex items-center">
            <ToggleGroup
              type="single"
              value={mode}
              onValueChange={(value) => {
                if (value) handleModeChange(value as PickerMode)
              }}
              size="sm"
              variant="outline"
              className="bg-gray-100"
            >
              <ToggleGroupItem 
                value="wheel" 
                className="flex items-center gap-1 rounded-r-none h-8 px-3 data-[state=on]:bg-gray-900 data-[state=on]:text-white"
              >
                <Circle className="h-3 w-3" />
                <span className="text-xs">Wheel</span>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="slider" 
                className="flex items-center gap-1 rounded-l-none h-8 px-3 data-[state=on]:bg-gray-900 data-[state=on]:text-white"
              >
                <GitCommitHorizontal className="h-3 w-3" />
                <span className="text-xs">Slider</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      </div>

      <div className="relative w-full flex justify-center">
        {/* Spread buttons */}
        <div className="absolute -top-1 -right-1 z-10 flex gap-1">
          {canSpreadHue && mode === "wheel" && (
            <button
              onClick={spreadHue}
              title="Spread hues evenly"
              className="bg-white rounded-full p-1 shadow-sm hover:bg-gray-100 transition-colors"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          )}
          {canSpreadSaturationLightness && mode === "wheel" && (
            <button
              onClick={spreadSaturation}
              title="Spread saturation evenly"
              className="bg-white rounded-full p-1 shadow-sm hover:bg-gray-100 transition-colors"
            >
              <ShrinkIcon className="h-4 w-4" />
            </button>
          )}
          {canSpreadSaturationLightness && mode === "slider" && (
            <button
              onClick={spreadLightness}
              title="Spread lightness evenly"
              className="bg-white rounded-full p-1 shadow-sm hover:bg-gray-100 transition-colors"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="w-[250px]">
          <Wheel
            lightness={lightness}
            hueSaturations={hueSaturations}
            selected={mode === "wheel" ? selectedIndex : 0}
            converter={currentConverter}
            onChange={handleWheelColorChange}
            size={250}
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <Slider
          hue={hue}
          saturation={saturation}
          lightnesses={lightnesses}
          selected={mode === "slider" ? selectedIndex : 0}
          converter={currentConverter}
          onChange={handleLightnessChange}
        />
      </div>

      <div className="mt-6 flex justify-center items-center gap-4">
        <div
          className="w-12 h-12 rounded-lg shadow-md cursor-pointer"
          style={{ backgroundColor: selectedColor }}
          onClick={copyToClipboard}
          title="Click to copy color"
        />
        <Hex value={selectedColor} onChange={handleHexChange} placeholder="000000" />
      </div>

      <div className="mt-4 w-full">
        <Details
          hue={hue}
          saturation={saturation}
          lightness={lightness}
          onChange={handleHslChange}
          converter={currentConverter}
        />
      </div>

      <ToastContainer />
    </div>
  )
}
