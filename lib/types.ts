// Rename RectangleType to TileType
export interface TileType {
  id: string
  label: string
  description: string
  color: string
  x: number
  y: number
  width: number
  height: number
}

export interface AppState {
  background: string
  items: TileType[]
}
