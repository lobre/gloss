"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Canvas } from "@/components/canvas"
import { Topbar } from "@/components/topbar"
import { Sidebar } from "@/components/sidebar"
import { BottomBar } from "@/components/bottom-bar"
import { ConfirmationDialog } from "@/components/confirmation-dialog"
import type { AppState, TileType } from "@/lib/types"
import { encodeState, decodeState } from "@/lib/state-encoder"

// Import the new color history system
import {
  createColorHistory,
  addColorToHistory,
  undoColorChange,
  redoColorChange,
  canUndoColor,
  canRedoColor,
  resetColorHistory,
  type ColorHistoryState,
} from "@/lib/color-history"

export default function GlossApp() {
  const [tiles, setTiles] = useState<TileType[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [backgroundColor, setBackgroundColor] = useState("#f0f0f0")
  const [isBackgroundSelected, setIsBackgroundSelected] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  // For contrast calculation
  const [contrastColor1, setContrastColor1] = useState<string | undefined>(undefined)
  const [contrastColor2, setContrastColor2] = useState<string | undefined>(undefined)

  // Color history for undo/redo
  const [colorHistory, setColorHistory] = useState<ColorHistoryState>(createColorHistory([]))

  // Flag to trigger picker re-render
  const [pickerKey, setPickerKey] = useState(0)

  // Handle color normalization confirmation
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationContext, setConfirmationContext] = useState<'initialization' | 'modeChange' | 'colorSpaceChange'>('initialization')
  const [confirmationResolve, setConfirmationResolve] = useState<((confirmed: boolean) => void) | null>(null)

  // New contrast colors state
  const [contrastColors, setContrastColors] = useState<string[]>([])

  // Load state from URL on initial render
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash) {
      try {
        setIsLoading(true)
        const decodedState = decodeState(hash)
        console.log("Decoded state:", decodedState) // Add logging to debug

        // Ensure tiles have the correct size
        const tilesWithCorrectSize = decodedState.items.map((tile) => ({
          ...tile,
          width: 90,
          height: 90,
        }))

        setTiles(tilesWithCorrectSize)
        setBackgroundColor(decodedState.background)

        // Focus the canvas after state is loaded
        setTimeout(() => {
          const canvasDiv = document.querySelector('.relative.overflow-auto.flex-1')
          if (canvasDiv) {
            (canvasDiv as HTMLElement).focus()
          }
        }, 100)
      } catch (error) {
        console.error("Failed to decode state from URL:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

  // Reset color history when selection changes
  useEffect(() => {
    // Don't reset history if we're just adding to the selection
    if (selectedIds.length > 0 && selectedIds.every(id => tiles.some(t => t.id === id))) {
      return
    }

    const selectedColors = isBackgroundSelected
      ? [backgroundColor]
      : selectedIds.map((id) => {
          const tile = tiles.find((t) => t.id === id)
          return tile ? tile.color : "#000000"
        })

    setColorHistory(resetColorHistory(selectedColors))
  }, [selectedIds, isBackgroundSelected, tiles])

  // Update contrast colors when selection changes
  useEffect(() => {
    if (selectedIds.length === 1) {
      // One tile selected - compare with background
      const selectedTile = tiles.find((tile) => tile.id === selectedIds[0])
      if (selectedTile) {
        setContrastColor1(selectedTile.color)
        setContrastColor2(backgroundColor)
      }
    } else if (selectedIds.length === 2) {
      // Two tiles selected - compare them
      const tile1 = tiles.find((tile) => tile.id === selectedIds[0])
      const tile2 = tiles.find((tile) => tile.id === selectedIds[1])
      if (tile1 && tile2) {
        setContrastColor1(tile1.color)
        setContrastColor2(tile2.color)
      }
    } else {
      // No contrast to show
      setContrastColor1(undefined)
      setContrastColor2(undefined)
    }
  }, [selectedIds, tiles, backgroundColor])

  const handleCreateTile = (x: number, y: number, addToSelection: boolean) => {
    // Deselect background if it was selected
    if (isBackgroundSelected) {
      setIsBackgroundSelected(false)
    }

    const newTile: TileType = {
      id: `tile-${Date.now()}`,
      label: `color ${tiles.length + 1}`,
      description: "",
      color:
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0"),
      x: Math.round(x / 20) * 20, // Grid alignment
      y: Math.round(y / 20) * 20, // Grid alignment
      width: 90,
      height: 90,
    }

    const newTiles = [...tiles, newTile]
    setTiles(newTiles)

    if (addToSelection) {
      setSelectedIds([...selectedIds, newTile.id])
    } else {
      setSelectedIds([newTile.id])
    }
  }

  const handleTileMove = (id: string, x: number, y: number) => {
    const newTiles = tiles.map((tile) =>
      tile.id === id
        ? {
            ...tile,
            x: Math.round(x / 20) * 20, // Grid alignment
            y: Math.round(y / 20) * 20, // Grid alignment
          }
        : tile,
    )

    setTiles(newTiles)
  }

  const handleMultiTileMove = (ids: string[], deltaX: number, deltaY: number) => {
    const newTiles = tiles.map((tile) => {
      if (ids.includes(tile.id)) {
        return {
          ...tile,
          x: Math.round((tile.x + deltaX) / 20) * 20, // Grid alignment
          y: Math.round((tile.y + deltaY) / 20) * 20, // Grid alignment
        }
      }
      return tile
    })

    setTiles(newTiles)
  }

  const handleTileMoveEnd = () => {
    // No need to track position changes in history
  }

  const handleUpdateTiles = (updatedProps: Partial<TileType>) => {
    // Update all selected tiles with the same properties
    const newTiles = tiles.map((tile) => {
      return selectedIds.includes(tile.id) ? { ...tile, ...updatedProps } : tile
    })

    setTiles(newTiles)
  }

  const handleUpdateColors = (newColors: string[], forceResetHistory?: boolean) => {
    if (selectedIds.length === 0) {
      // Update background color
      setBackgroundColor(newColors[0])
      if (!forceResetHistory) {
        setColorHistory(addColorToHistory(colorHistory, [backgroundColor]))
      } else {
        setColorHistory(resetColorHistory([newColors[0]]))
      }
    } else {
      // Update selected tiles with their corresponding colors
      const updatedTiles = tiles.map(tile => {
        if (selectedIds.includes(tile.id)) {
          const index = selectedIds.indexOf(tile.id)
          return { ...tile, color: newColors[index] }
        }
        return tile
      })
      setTiles(updatedTiles)
      
      if (!forceResetHistory) {
        const selectedColors = updatedTiles
          .filter(tile => selectedIds.includes(tile.id))
          .map(tile => tile.color)
        setColorHistory(addColorToHistory(colorHistory, selectedColors))
      } else {
        setColorHistory(resetColorHistory(newColors))
      }
    }
    // Update contrast colors
    const newContrastColors = newColors.map(color => getContrastColor(color))
    setContrastColors(newContrastColors)

    // Maintain focus on canvas after normalization
    if (forceResetHistory) {
      const canvasDiv = document.querySelector('.relative.overflow-auto.flex-1')
      if (canvasDiv) {
        (canvasDiv as HTMLElement).focus()
      }
    }
  }

  const handleRemoveSelected = () => {
    const newTiles = tiles.filter((tile) => !selectedIds.includes(tile.id))
    setTiles(newTiles)
    setSelectedIds([])
  }

  const handleReset = () => {
    const newTiles: TileType[] = []
    const newBackground = "#f0f0f0"

    setTiles(newTiles)
    setSelectedIds([])
    setBackgroundColor(newBackground)
    setIsBackgroundSelected(false)
  }

  // Simplified undo handler - only for colors
  const handleUndo = () => {
    if (canUndoColor(colorHistory)) {
      const newHistory = undoColorChange(colorHistory)
      setColorHistory(newHistory)
      handleUpdateColorsFromHistory(newHistory.present)
      // Trigger picker re-render to detect new color space and mode
      setPickerKey((prev) => prev + 1)
    }
  }

  // Simplified redo handler - only for colors
  const handleRedo = () => {
    if (canRedoColor(colorHistory)) {
      const newHistory = redoColorChange(colorHistory)
      setColorHistory(newHistory)
      handleUpdateColorsFromHistory(newHistory.present)
      // Trigger picker re-render to detect new color space and mode
      setPickerKey((prev) => prev + 1)
    }
  }

  // Helper to update colors from history without adding to history
  const handleUpdateColorsFromHistory = (historyColors: string[]) => {
    if (isBackgroundSelected) {
      // If background is selected, update background color
      if (historyColors.length > 0) {
        setBackgroundColor(historyColors[0])
      }
    } else {
      // Otherwise, update selected tiles with history colors
      const updatedTiles = [...tiles]

      // Update each selected tile with its corresponding color
      selectedIds.forEach((id, index) => {
        if (index < historyColors.length) {
          const tileIndex = updatedTiles.findIndex((tile) => tile.id === id)
          if (tileIndex !== -1) {
            updatedTiles[tileIndex] = {
              ...updatedTiles[tileIndex],
              color: historyColors[index],
            }
          }
        }
      })

      setTiles(updatedTiles)

      // Update contrast colors if needed
      if (selectedIds.length === 1 && historyColors.length > 0) {
        setContrastColor1(historyColors[0])
        setContrastColor2(backgroundColor)
      } else if (selectedIds.length === 2 && historyColors.length >= 2) {
        setContrastColor1(historyColors[0])
        setContrastColor2(historyColors[1])
      }
    }
  }

  // Handle background color selection
  const handleBackgroundSelect = () => {
    setIsBackgroundSelected(true)
    setSelectedIds([]) // Clear any selected tiles
  }

  // Handle selection change
  const handleSelectionChange = (newSelection: string[]) => {
    setSelectedIds(newSelection)
    setIsBackgroundSelected(false) // Clear background selection when selecting tiles
    
    // Reset color history for new selection
    const selectedColors = newSelection.map((id) => {
      const tile = tiles.find((t) => t.id === id)
      return tile ? tile.color : "#000000"
    })
    setColorHistory(resetColorHistory(selectedColors))
  }

  // Determine colors to pass to the sidebar
  const sidebarColors = isBackgroundSelected
    ? [backgroundColor]
    : selectedIds.map((id) => {
        const tile = tiles.find((t) => t.id === id)
        return tile ? tile.color : "#000000"
      })

  const getExportData = (): AppState => {
    return {
      background: backgroundColor,
      items: [...tiles]
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(({ id, x, y, width, height, ...rest }) => ({
          ...rest,
          id,
          x,
          y,
          width,
          height
        })),
    }
  }

  const getUrlEncodedState = (): string => {
    return encodeState({
      background: backgroundColor,
      items: tiles,
    })
  }

  // Handle tile reordering (bring to front)
  const handleTileReorder = (id: string) => {
    const updatedTiles = [...tiles]
    const index = updatedTiles.findIndex((t) => t.id === id)
    if (index !== -1) {
      const [tile] = updatedTiles.splice(index, 1)
      updatedTiles.push(tile)
      setTiles(updatedTiles)
    }
  }

  // Handle canvas click
  const handleCanvasClick = () => {
    // Deselect background when clicking on canvas
    if (isBackgroundSelected) {
      setIsBackgroundSelected(false)
    }
  }

  // Handle canvas key down
  const handleCanvasKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      if (selectedIds.length > 0) {
        handleRemoveSelected()
      }
    }
  }

  // Determine if undo/redo should be shown
  const showUndoRedo = isBackgroundSelected || selectedIds.length > 0

  // Handle color normalization confirmation
  const handleConfirmNormalization = (context: 'initialization' | 'modeChange' | 'colorSpaceChange') => {
    return new Promise<boolean>((resolve) => {
      setShowConfirmation(true)
      setConfirmationContext(context)
      setConfirmationResolve(() => resolve)
    })
  }

  // Handle confirmation response
  const handleConfirmationResponse = (confirmed: boolean) => {
    setShowConfirmation(false)
    if (confirmationResolve) {
      confirmationResolve(confirmed)
      setConfirmationResolve(null)
    }

    // Clear selection if normalization was rejected
    if (!confirmed) {
      setSelectedIds([])
      setIsBackgroundSelected(false)
    }
  }

  const getContrastColor = (color: string): string => {
    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    
    // Return black or white based on luminance
    return luminance > 0.5 ? '#000000' : '#FFFFFF'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <Topbar
        backgroundColor={backgroundColor}
        onBackgroundColorChange={setBackgroundColor}
        onBackgroundSelect={handleBackgroundSelect}
        onReset={handleReset}
        getExportData={getExportData}
        getUrlEncodedState={getUrlEncodedState}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndoColor(colorHistory)}
        canRedo={canRedoColor(colorHistory)}
        showUndoRedo={showUndoRedo}
        hasTiles={tiles.length > 0}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative overflow-auto flex-1" onKeyDown={handleCanvasKeyDown} tabIndex={0}>
          <Canvas
            ref={canvasRef}
            tiles={tiles}
            selectedIds={selectedIds}
            backgroundColor={backgroundColor}
            onCreateTile={handleCreateTile}
            onTileMove={handleTileMove}
            onSelectionChange={handleSelectionChange}
            onTileReorder={handleTileReorder}
            onMultiTileMove={handleMultiTileMove}
            onKeyDown={handleCanvasKeyDown}
            onClick={handleCanvasClick}
            onMoveEnd={handleTileMoveEnd}
          />
        </div>
        <Sidebar
          key={pickerKey}
          selectedTiles={selectedIds.map((id) => tiles.find((tile) => tile.id === id)!).filter(Boolean)}
          onUpdateTiles={handleUpdateTiles}
          colors={sidebarColors}
          onUpdateColors={handleUpdateColors}
          onRemoveSelected={handleRemoveSelected}
          onClearSelection={() => setSelectedIds([])}
          onConfirmNormalization={handleConfirmNormalization}
        />
      </div>
      <BottomBar color1={contrastColor1} color2={contrastColor2} />
      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => handleConfirmationResponse(false)}
        onConfirm={() => handleConfirmationResponse(true)}
        title="Confirm Color Normalization"
        message="This action will normalize the selected colors. Do you want to proceed?"
      />
    </div>
  )
}
