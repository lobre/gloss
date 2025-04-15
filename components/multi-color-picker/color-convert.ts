// Color conversion utilities based on Björn Ottosson's implementation
// https://github.com/bottosson/bottosson.github.io/blob/master/misc/colorpicker/colorconversion.js

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return [h, s, l]
}

// Add hslToRgb function for the wheel rendering
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  // Special cases for black and white
  if (l === 0) return [0, 0, 0]
  if (l === 1) return [255, 255, 255]

  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hueToRgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

// sRGB transfer functions
function srgbTransferFunction(a: number): number {
  return a <= 0.0031308 ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - 0.055
}

function srgbTransferFunctionInv(a: number): number {
  return a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4)
}

// Convert linear sRGB to OKLAB
export function linearSrgbToOklab(r: number, g: number, b: number): [number, number, number] {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b

  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)

  return [
    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  ]
}

// Convert OKLAB to linear sRGB
export function oklabToLinearSrgb(L: number, a: number, b: number): [number, number, number] {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

// Toe functions for perceptual lightness
function toe(x: number): number {
  const k1 = 0.206
  const k2 = 0.03
  const k3 = (1 + k1) / (1 + k2)

  return 0.5 * (k3 * x - k1 + Math.sqrt((k3 * x - k1) * (k3 * x - k1) + 4 * k2 * k3 * x))
}

function toeInv(x: number): number {
  const k1 = 0.206
  const k2 = 0.03
  const k3 = (1 + k1) / (1 + k2)
  return (x * x + k1 * x) / (k3 * (x + k2))
}

// Compute maximum saturation for a given hue that fits in sRGB
// a and b must be normalized so a^2 + b^2 == 1
function computeMaxSaturation(a: number, b: number): number {
  // Max saturation will be when one of r, g or b goes below zero.
  let k0, k1, k2, k3, k4, wl, wm, ws

  if (-1.88170328 * a - 0.80936493 * b > 1) {
    // Red component
    k0 = +1.19086277
    k1 = +1.76576728
    k2 = +0.59662641
    k3 = +0.75515197
    k4 = +0.56771245
    wl = +4.0767416621
    wm = -3.3077115913
    ws = +0.2309699292
  } else if (1.81444104 * a - 1.19445276 * b > 1) {
    // Green component
    k0 = +0.73956515
    k1 = -0.45954404
    k2 = +0.08285427
    k3 = +0.1254107
    k4 = +0.14503204
    wl = -1.2684380046
    wm = +2.6097574011
    ws = -0.3413193965
  } else {
    // Blue component
    k0 = +1.35733652
    k1 = -0.00915799
    k2 = -1.1513021
    k3 = -0.50559606
    k4 = +0.00692167
    wl = -0.0041960863
    wm = -0.7034186147
    ws = +1.707614701
  }

  // Approximate max saturation using a polynomial
  let S = k0 + k1 * a + k2 * b + k3 * a * a + k4 * a * b

  // Do one step of Halley's method to refine
  const kl = +0.3963377774 * a + 0.2158037573 * b
  const km = -0.1055613458 * a - 0.0638541728 * b
  const ks = -0.0894841775 * a - 1.291485548 * b

  {
    const l_ = 1 + S * kl
    const m_ = 1 + S * km
    const s_ = 1 + S * ks

    const l = l_ * l_ * l_
    const m = m_ * m_ * m_
    const s = s_ * s_ * s_

    const lDS = 3 * kl * l_ * l_
    const mDS = 3 * km * m_ * m_
    const sDS = 3 * ks * s_ * s_

    const lDS2 = 6 * kl * kl * l_
    const mDS2 = 6 * km * km * m_
    const sDS2 = 6 * ks * ks * s_

    const f = wl * l + wm * m + ws * s
    const f1 = wl * lDS + wm * mDS + ws * sDS
    const f2 = wl * lDS2 + wm * mDS2 + ws * sDS2

    S = S - (f * f1) / (f1 * f1 - 0.5 * f * f2)
  }

  return S
}

// Find the cusp of the gamut triangle
function findCusp(a: number, b: number): [number, number] {
  // First, find the maximum saturation (saturation S = C/L)
  const SCusp = computeMaxSaturation(a, b)

  // Convert to linear sRGB to find the first point where at least one of r,g or b >= 1
  const rgbAtMax = oklabToLinearSrgb(1, SCusp * a, SCusp * b)
  const LCusp = Math.cbrt(1 / Math.max(Math.max(rgbAtMax[0], rgbAtMax[1]), rgbAtMax[2]))
  const CCusp = LCusp * SCusp

  return [LCusp, CCusp]
}

// Find the ST max (S = C/L, T = C/(1-L))
function getSTMax(a: number, b: number, cusp?: [number, number]): [number, number] {
  if (!cusp) {
    cusp = findCusp(a, b)
  }

  const L = cusp[0]
  const C = cusp[1]
  return [C / L, C / (1 - L)]
}

// Get the mid-point ST values
function getSTMid(a: number, b: number): [number, number] {
  const S =
    0.11516993 +
    1 /
      (+7.4477897 +
        4.1590124 * b +
        a *
          (-2.19557347 +
            1.75198401 * b +
            a * (-2.13704948 - 10.02301043 * b + a * (-4.24894561 + 5.38770819 * b + 4.69891013 * a))))

  const T =
    0.11239642 +
    1 /
      (+1.6132032 -
        0.68124379 * b +
        a *
          (+0.40370612 +
            0.90148123 * b +
            a * (-0.27087943 + 0.6122399 * b + a * (+0.00299215 - 0.45399568 * b - 0.14661872 * a))))

  return [S, T]
}

// Find intersection with the gamut boundary
function findGamutIntersection(
  a: number,
  b: number,
  L1: number,
  C1: number,
  L0: number,
  cusp?: [number, number],
): number {
  if (!cusp) {
    cusp = findCusp(a, b)
  }

  // Find the intersection for upper and lower half separately
  let t
  if ((L1 - L0) * cusp[1] - (cusp[0] - L0) * C1 <= 0) {
    // Lower half
    t = (cusp[1] * L0) / (C1 * cusp[0] + cusp[1] * (L0 - L1))
  } else {
    // Upper half
    t = (cusp[1] * (L0 - 1)) / (C1 * (cusp[0] - 1) + cusp[1] * (L0 - L1))
  }

  return t
}

// Get the Cs values for a given L, a, b
function getCs(L: number, a: number, b: number): [number, number, number] {
  const cusp = findCusp(a, b)

  const CMax = findGamutIntersection(a, b, L, 1, L, cusp)
  const STMax = getSTMax(a, b, cusp)

  // Ensure we're using the exact same constants as in Björn's implementation
  const SMid =
    0.11516993 +
    1 /
      (+7.4477897 +
        4.1590124 * b +
        a *
          (-2.19557347 +
            1.75198401 * b +
            a * (-2.13704948 - 10.02301043 * b + a * (-4.24894561 + 5.38770819 * b + 4.69891013 * a))))

  const TMid =
    0.11239642 +
    1 /
      (+1.6132032 -
        0.68124379 * b +
        a *
          (+0.40370612 +
            0.90148123 * b +
            a * (-0.27087943 + 0.6122399 * b + a * (+0.00299215 - 0.45399568 * b - 0.14661872 * a))))

  const k = CMax / Math.min(L * STMax[0], (1 - L) * STMax[1])

  let CMid
  {
    const Ca = L * SMid
    const Cb = (1 - L) * TMid

    CMid = 0.9 * k * Math.sqrt(Math.sqrt(1 / (1 / (Ca * Ca * Ca * Ca) + 1 / (Cb * Cb * Cb * Cb))))
  }

  let C0
  {
    const Ca = L * 0.4
    const Cb = (1 - L) * 0.8

    C0 = Math.sqrt(1 / (1 / (Ca * Ca) + 1 / (Cb * Cb)))
  }

  return [C0, CMid, CMax]
}

// Convert OKHsl to sRGB with high precision
export function okhslToSrgb(h: number, s: number, l: number): [number, number, number] {
  // Special cases for black and white - force hue and saturation to 0
  if (l === 0) return [0, 0, 0]
  if (l === 1) return [255, 255, 255]

  // If saturation is 0, we have a grayscale color, so hue doesn't matter
  const a = s === 0 ? 1 : Math.cos(2 * Math.PI * h)
  const b = s === 0 ? 0 : Math.sin(2 * Math.PI * h)
  const L = toeInv(l)

  // For very small L values, we can skip the color calculations and return black
  if (L < 0.0001) {
    return [0, 0, 0]
  }

  const Cs = getCs(L, a, b)
  const C0 = Cs[0]
  const CMid = Cs[1]
  const CMax = Cs[2]

  let C, t, k0, k1, k2
  if (s < 0.8) {
    t = 1.25 * s
    k0 = 0
    k1 = 0.8 * C0
    k2 = 1 - k1 / CMid
  } else {
    t = 5 * (s - 0.8)
    k0 = CMid
    k1 = (0.2 * CMid * CMid * 1.25 * 1.25) / C0
    k2 = 1 - k1 / (CMax - CMid)
  }

  C = k0 + (t * k1) / (1 - k2 * t)

  // Ensure high precision in the RGB conversion
  const rgb = oklabToLinearSrgb(L, C * a, C * b)
  return [
    Math.round(255 * srgbTransferFunction(rgb[0])),
    Math.round(255 * srgbTransferFunction(rgb[1])),
    Math.round(255 * srgbTransferFunction(rgb[2])),
  ]
}

// Convert sRGB to OKHsl with high precision
export function srgbToOkhsl(r: number, g: number, b: number): [number, number, number] {
  // Special case for black and white - return 0 for hue and saturation
  if (r === 0 && g === 0 && b === 0) return [0, 0, 0]
  if (r === 255 && g === 255 && b === 255) return [0, 0, 1]

  const lab = linearSrgbToOklab(
    srgbTransferFunctionInv(r / 255),
    srgbTransferFunctionInv(g / 255),
    srgbTransferFunctionInv(b / 255),
  )

  const C = Math.sqrt(lab[1] * lab[1] + lab[2] * lab[2])
  const a = C > 0 ? lab[1] / C : 1
  const b_ = C > 0 ? lab[2] / C : 0

  const L = lab[0]
  const h = 0.5 + (0.5 * Math.atan2(-lab[2], -lab[1])) / Math.PI

  const Cs = getCs(L, a, b_)
  const C0 = Cs[0]
  const CMid = Cs[1]
  const CMax = Cs[2]

  let s
  if (C < CMid) {
    const k0 = 0
    const k1 = 0.8 * C0
    const k2 = 1 - k1 / CMid

    const t = (C - k0) / (k1 + k2 * (C - k0))
    s = t * 0.8
  } else {
    const k0 = CMid
    const k1 = (0.2 * CMid * CMid * 1.25 * 1.25) / C0
    const k2 = 1 - k1 / (CMax - CMid)

    const t = (C - k0) / (k1 + k2 * (C - k0))
    s = 0.8 + 0.2 * t
  }

  const l = toe(L)
  return [h, s, l]
}

// Convert hex to RGB
export function hexToRgb(hex: string): [number, number, number] | null {
  if (!hex || typeof hex !== 'string') return null
  
  if (hex.charAt(0) === "#") {
    hex = hex.substring(1)
  }

  if (hex.match(/^([0-9a-f]{3})$/i)) {
    const r = (Number.parseInt(hex.charAt(0), 16) / 15) * 255
    const g = (Number.parseInt(hex.charAt(1), 16) / 15) * 255
    const b = (Number.parseInt(hex.charAt(2), 16) / 15) * 255
    return [r, g, b]
  }

  if (hex.match(/^([0-9a-f]{6})$/i)) {
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)
    return [r, g, b]
  }

  return null
}

// Convert RGB to hex
export function rgbToHex(r: number, g: number, b: number): string {
  const componentToHex = (x: number) => {
    // Clamp value to 0-255 range
    const clamped = Math.max(0, Math.min(255, Math.round(x)))
    const hex = clamped.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

// Convert HSL to hex
export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l)
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

// Convert OKHsl to hex
export function okhslToHex(h: number, s: number, l: number): string {
  const rgb = okhslToSrgb(h, s, l)
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

// Convert hex to HSL
export function hexToHsl(hex: string): [number, number, number] | null {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  return rgbToHsl(rgb[0], rgb[1], rgb[2])
}

// Convert hex to OKHsl
export function hexToOkhsl(hex: string): [number, number, number] | null {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  return srgbToOkhsl(rgb[0], rgb[1], rgb[2])
}
