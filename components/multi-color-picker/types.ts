export type ColorSpace = "hsl" | "okhsl"
export type PickerMode = "wheel" | "slider"

export interface MultiColorPickerProps {
  colors: string[]
  onChange: (colors: string[], forceResetHistory?: boolean) => void
  defaultColorSpace?: ColorSpace
  defaultMode?: PickerMode
  confirmNormalization?: (context: 'initialization' | 'modeChange' | 'colorSpaceChange') => Promise<boolean>
  onResetColorHistory?: () => void
}

export interface ToastProps {
  message: string
  duration?: number
}

export interface ColorModeConverter {
  toHex: (h: number, s: number, l: number) => string
  toRgb: (h: number, s: number, l: number) => [number, number, number]
}
