import type { ColorSpace } from "./types"
import { hexToHsl, hexToOkhsl, hslToHex, okhslToHex } from "./color-convert"

// Checks if two arrays of colors are equal.
export function areColorArraysEqual(colors1: string[], colors2: string[], space: ColorSpace = "hsl"): boolean {
  if (colors1.length !== colors2.length) return false

  return colors1.every((color, index) => {
    const otherColor = colors2[index]
    return haveSameHueAndSaturation(color, otherColor, space) && haveSameLightness(color, otherColor, space)
  })
}

// Checks if two colors have the same lightness, accounting for color space differences.
export function haveSameLightness(
  color1: string | [number, number, number],
  color2: string | [number, number, number],
  space: ColorSpace = "hsl",
): boolean {
  // Convert to HSL values if needed
  let hsl1: [number, number, number] | null
  let hsl2: [number, number, number] | null

  if (typeof color1 === "string") {
    hsl1 = space === "hsl" ? hexToHsl(color1) : hexToOkhsl(color1)
  } else {
    hsl1 = color1
  }

  if (typeof color2 === "string") {
    hsl2 = space === "hsl" ? hexToHsl(color2) : hexToOkhsl(color2)
  } else {
    hsl2 = color2
  }

  if (!hsl1 || !hsl2) return false

  const tolerance = space === "okhsl" ? 0.02 : 0.05 // OKHSL is perceptually uniform, so smaller tolerance
  return Math.abs(hsl1[2] - hsl2[2]) < tolerance
}

// Checks if two colors have the same hue and saturation, accounting for color space differences.
export function haveSameHueAndSaturation(
  color1: string | [number, number, number],
  color2: string | [number, number, number],
  space: ColorSpace = "hsl",
): boolean {
  // Convert to HSL values if needed
  let hsl1: [number, number, number] | null
  let hsl2: [number, number, number] | null

  if (typeof color1 === "string") {
    hsl1 = space === "hsl" ? hexToHsl(color1) : hexToOkhsl(color1)
  } else {
    hsl1 = color1
  }

  if (typeof color2 === "string") {
    hsl2 = space === "hsl" ? hexToHsl(color2) : hexToOkhsl(color2)
  } else {
    hsl2 = color2
  }

  if (!hsl1 || !hsl2) return false

  const hueTolerance = space === "okhsl" ? 0.01 : 0.03 // OKHSL needs tighter control for perceptual accuracy
  const satTolerance = space === "okhsl" ? 0.05 : 0.1 // Saturation tolerance can be a bit more relaxed

  return Math.abs(hsl1[0] - hsl2[0]) < hueTolerance && Math.abs(hsl1[1] - hsl2[1]) < satTolerance
}

// Check if a string is a valid hex color
export function isValidHexColor(color: string): boolean {
  const hexRegex = /^#[0-9A-Fa-f]{6}$/
  return hexRegex.test(color)
}

// Derive a new color by adjusting HSL values
export function derivedColor(
  color: string,
  adjustments: { hue?: number; saturation?: number; lightness?: number },
  space: ColorSpace = "hsl",
): string {
  const values = space === "hsl" ? hexToHsl(color) : hexToOkhsl(color)
  if (!values) return color

  const newHue = adjustments.hue !== undefined ? adjustments.hue / 360 : values[0]
  const newSaturation = adjustments.saturation !== undefined ? adjustments.saturation : values[1]
  const newLightness = adjustments.lightness !== undefined ? adjustments.lightness : values[2]

  return space === "hsl"
    ? hslToHex(newHue, newSaturation, newLightness)
    : okhslToHex(newHue, newSaturation, newLightness)
}
