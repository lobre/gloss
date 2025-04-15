import type { AppState, TileType } from "@/lib/types"

// Encode the application state to a URL-friendly string
export function encodeState(state: AppState): string {
  try {
    // Create a string representation of the state
    let encodedString = `background=${encodeURIComponent(state.background)}`

    // Add each tile
    state.items.forEach((item) => {
      encodedString += `|${encodeURIComponent(item.label)}:${encodeURIComponent(item.color)}:${encodeURIComponent(item.description)}:${item.x}:${item.y}`
    })

    // Base64 encode to make it URL-safe
    return btoa(encodedString)
  } catch (error) {
    console.error("Error encoding state:", error)
    return ""
  }
}

// Update the decodeState function to use the correct tile size
export function decodeState(encodedState: string): AppState {
  try {
    // Base64 decode
    const decodedString = atob(encodedState)
    console.log("Decoded string:", decodedString) // Add logging to debug

    // Split into parts
    const parts = decodedString.split("|")

    // Extract background color
    const backgroundPart = parts[0]
    const background = decodeURIComponent(backgroundPart.split("=")[1])

    // Extract tiles
    const items: TileType[] = []

    for (let i = 1; i < parts.length; i++) {
      const tileParts = parts[i].split(":")

      if (tileParts.length >= 5) {
        // Generate a deterministic ID based on the tile's properties
        const id = `tile-${tileParts[0]}-${tileParts[1]}-${tileParts[3]}-${tileParts[4]}`
        
        items.push({
          id,
          label: decodeURIComponent(tileParts[0]),
          color: decodeURIComponent(tileParts[1]),
          description: decodeURIComponent(tileParts[2]),
          x: Number.parseInt(tileParts[3], 10),
          y: Number.parseInt(tileParts[4], 10),
          width: 90,
          height: 90,
        })
      }
    }

    console.log("Decoded items:", items) // Add logging to debug
    return { background, items }
  } catch (error) {
    console.error("Error decoding state:", error)
    return { background: "#f0f0f0", items: [] }
  }
}
