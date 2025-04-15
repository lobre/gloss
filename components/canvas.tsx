"use client"

import type React from "react"

import { forwardRef, useRef, useState, useEffect } from "react"
import type { TileType } from "@/lib/types"
import { Tile } from "@/components/tile"
import { getContrastColor } from "@/lib/contrast"

// Update the interface to include onMoveEnd
interface CanvasProps {
  tiles: TileType[]
  selectedIds: string[]
  backgroundColor: string
  onCreateTile: (x: number, y: number, addToSelection: boolean) => void
  onTileMove: (id: string, x: number, y: number) => void
  onSelectionChange: (ids: string[]) => void
  onTileReorder: (id: string) => void
  onMultiTileMove: (ids: string[], deltaX: number, deltaY: number) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onClick?: () => void
  onMoveEnd?: () => void
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  (
    {
      tiles,
      selectedIds,
      backgroundColor,
      onCreateTile,
      onTileMove,
      onSelectionChange,
      onTileReorder,
      onMultiTileMove,
      onKeyDown,
      onClick,
      onMoveEnd,
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [draggedTileId, setDraggedTileId] = useState<string | null>(null)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const [isCtrlPressed, setIsCtrlPressed] = useState(false)
    const [hasMoved, setHasMoved] = useState(false)
    const [clickedTileId, setClickedTileId] = useState<string | null>(null)

    // Selection box state
    const [isSelecting, setIsSelecting] = useState(false)
    const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 })
    const [selectionCurrent, setSelectionCurrent] = useState({ x: 0, y: 0 })

    // Track Ctrl key state
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Control") {
          setIsCtrlPressed(true)
        }
      }

      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === "Control") {
          setIsCtrlPressed(false)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      window.addEventListener("keyup", handleKeyUp)

      return () => {
        window.removeEventListener("keydown", handleKeyDown)
        window.removeEventListener("keyup", handleKeyUp)
      }
    }, [])

    // Get canvas coordinates from mouse event
    const getCanvasCoordinates = (e: React.MouseEvent) => {
      if (!canvasRef.current) return { x: 0, y: 0 }

      const rect = canvasRef.current.getBoundingClientRect()
      return {
        x: e.clientX - rect.left + canvasRef.current.scrollLeft,
        y: e.clientY - rect.top + canvasRef.current.scrollTop,
      }
    }

    // Handle right-click to create new tile
    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault()
      const { x, y } = getCanvasCoordinates(e)

      // Create tile with top-left at mouse position
      onCreateTile(x, y, e.ctrlKey || isCtrlPressed)
    }

    // Handle mouse down for selection
    const handleMouseDown = (e: React.MouseEvent) => {
      // Only handle left mouse button
      if (e.button !== 0) return

      // Call onClick handler if provided
      if (onClick) {
        onClick()
      }

      // Check if we clicked directly on the canvas (not on a tile)
      if (e.target === canvasRef.current || e.target === canvasRef.current?.firstChild) {
        const coords = getCanvasCoordinates(e)
        setSelectionStart(coords)
        setSelectionCurrent(coords)
        setIsSelecting(true)

        // Clear selection if not holding Ctrl
        if (!e.ctrlKey && !isCtrlPressed) {
          onSelectionChange([])
        }
      }
    }

    // Handle mouse move - simplified movement logic
    const handleMouseMove = (e: React.MouseEvent) => {
      const coords = getCanvasCoordinates(e)

      // Handle selection box
      if (isSelecting) {
        setSelectionCurrent(coords)
      }

      // Handle tile dragging - use same logic for single and multi-tile
      if (isDragging && draggedTileId) {
        setHasMoved(true)

        const newX = coords.x - dragOffset.x
        const newY = coords.y - dragOffset.y

        if (selectedIds.includes(draggedTileId) && selectedIds.length > 1) {
          // Get the dragged tile
          const draggedTile = tiles.find((t) => t.id === draggedTileId)
          if (draggedTile) {
            // Calculate the delta from the dragged tile's current position
            const deltaX = newX - draggedTile.x
            const deltaY = newY - draggedTile.y

            // Move all selected tiles by the same delta
            onMultiTileMove(selectedIds, deltaX, deltaY)
          }
        } else {
          // Move just the dragged tile
          onTileMove(draggedTileId, newX, newY)
        }
      }
    }

    // Handle mouse up
    const handleMouseUp = (e: React.MouseEvent) => {
      // Handle selection completion
      if (isSelecting) {
        // Calculate selection box
        const left = Math.min(selectionStart.x, selectionCurrent.x)
        const top = Math.min(selectionStart.y, selectionCurrent.y)
        const right = Math.max(selectionStart.x, selectionCurrent.x)
        const bottom = Math.max(selectionStart.y, selectionCurrent.y)

        // Find tiles in the selection box
        const selectedTiles = tiles.filter((tile) => {
          return tile.x < right && tile.x + tile.width > left && tile.y < bottom && tile.y + tile.height > top
        })

        if (selectedTiles.length > 0) {
          const newSelectedIds = selectedTiles.map((tile) => tile.id)

          // Combine with existing selection if Ctrl was held
          if (e.ctrlKey || isCtrlPressed) {
            const existingIds = selectedIds.filter((id) => !newSelectedIds.includes(id))
            onSelectionChange([...existingIds, ...newSelectedIds])
          } else {
            onSelectionChange(newSelectedIds)
          }
        }

        setIsSelecting(false)
      }

      // Handle tile click (if we didn't drag)
      if (isDragging && !hasMoved && clickedTileId) {
        handleTileSelection(clickedTileId, e.ctrlKey || isCtrlPressed)
      }

      // Call onMoveEnd if we were dragging and actually moved something
      if (isDragging && hasMoved && onMoveEnd) {
        onMoveEnd()
      }

      // Always end dragging on mouse up
      setIsDragging(false)
      setDraggedTileId(null)
      setHasMoved(false)
      setClickedTileId(null)
    }

    // Handle tile selection - separated from drag logic
    const handleTileSelection = (id: string, ctrlKey: boolean) => {
      // Move the clicked tile to the front immediately
      onTileReorder(id)

      if (ctrlKey) {
        // Add to selection with Ctrl+click
        if (!selectedIds.includes(id)) {
          onSelectionChange([...selectedIds, id])
        }
      } else if (!selectedIds.includes(id)) {
        // Select only this tile if not already selected and Ctrl is not pressed
        onSelectionChange([id])
      }
    }

    // Handle tile click
    const handleTileClick = (id: string, e: React.MouseEvent) => {
      e.stopPropagation()

      // If we're not dragging, handle the selection directly
      if (!isDragging) {
        handleTileSelection(id, e.ctrlKey || isCtrlPressed)
      }
    }

    // Handle tile drag start - completely separated from click logic
    const handleTileDragStart = (id: string, e: React.MouseEvent) => {
      // Only handle left mouse button for drag
      if (e.button !== 0) return

      e.stopPropagation()

      // Save the clicked tile ID for potential click handling on mouseup
      setClickedTileId(id)
      setHasMoved(false)

      const tile = tiles.find((t) => t.id === id)
      if (tile) {
        const coords = getCanvasCoordinates(e)

        // Set drag offset for movement
        setDragOffset({
          x: coords.x - tile.x,
          y: coords.y - tile.y,
        })

        setIsDragging(true)
        setDraggedTileId(id)

        // If the tile is not already selected, select it
        if (!selectedIds.includes(id)) {
          if (e.ctrlKey || isCtrlPressed) {
            onSelectionChange([...selectedIds, id])
          } else {
            onSelectionChange([id])
          }
        }

        // Move the tile to the front
        onTileReorder(id)
      }
    }

    // Calculate selection box dimensions
    const selectionBox = {
      left: Math.min(selectionStart.x, selectionCurrent.x),
      top: Math.min(selectionStart.y, selectionCurrent.y),
      width: Math.abs(selectionCurrent.x - selectionStart.x),
      height: Math.abs(selectionCurrent.y - selectionStart.y),
    }

    // Determine selection box color based on background
    const selectionBoxColor = getContrastColor(backgroundColor)

    return (
      <div
        ref={(node) => {
          // Handle both the forwarded ref and the local ref
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          canvasRef.current = node
        }}
        className="flex-1 overflow-auto relative"
        style={{ backgroundColor }}
        onContextMenu={handleContextMenu}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onKeyDown={onKeyDown}
        tabIndex={0} // Make the canvas focusable
      >
        <div className="relative w-[3000px] h-[3000px]">
          {/* Tiles */}
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              tile={tile}
              isSelected={selectedIds.includes(tile.id)}
              isDragging={draggedTileId === tile.id}
              backgroundColor={backgroundColor}
              onClick={(e) => handleTileClick(tile.id, e)}
              onDragStart={(e) => handleTileDragStart(tile.id, e)}
            />
          ))}

          {/* Selection Box */}
          {isSelecting && selectionBox.width > 5 && selectionBox.height > 5 && (
            <div
              className="absolute pointer-events-none z-[1000]"
              style={{
                left: `${selectionBox.left}px`,
                top: `${selectionBox.top}px`,
                width: `${selectionBox.width}px`,
                height: `${selectionBox.height}px`,
                border: `1px dashed ${selectionBoxColor}`,
                backgroundColor: `${selectionBoxColor}10`,
              }}
            />
          )}
        </div>
      </div>
    )
  },
)

Canvas.displayName = "Canvas"
