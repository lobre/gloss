// Convert hex color to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  hex = hex.replace(/^#/, "")

  // Parse hex values
  const bigint = Number.parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}

// Calculate relative luminance for WCAG contrast
export function calculateLuminance(color: string): number {
  const rgb = hexToRgb(color)

  // Convert RGB to relative luminance
  const rsrgb = rgb.r / 255
  const gsrgb = rgb.g / 255
  const bsrgb = rgb.b / 255

  const r = rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4)
  const g = gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4)
  const b = bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4)

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Calculate contrast ratio between two colors
export function calculateContrastRatio(color1: string, color2: string): number {
  const luminance1 = calculateLuminance(color1)
  const luminance2 = calculateLuminance(color2)

  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return (lighter + 0.05) / (darker + 0.05)
}

// Determine if text should be white or black based on background color
export function getContrastColor(backgroundColor: string): string {
  const luminance = calculateLuminance(backgroundColor)
  return luminance > 0.5 ? "#000000" : "#ffffff"
}
