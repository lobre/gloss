"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { TileType } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MultiColorPicker } from "@/components/multi-color-picker/picker"

interface SidebarProps {
  selectedTiles: TileType[]
  onUpdateTiles: (props: Partial<TileType>) => void
  colors: string[]
  onUpdateColors: (colors: string[], skipHistory?: boolean) => void
  onRemoveSelected: () => void
  onClearSelection: () => void
  onConfirmNormalization: (context: 'initialization' | 'modeChange' | 'colorSpaceChange') => Promise<boolean>
}

export function Sidebar({ selectedTiles, onUpdateTiles, colors, onUpdateColors, onRemoveSelected, onClearSelection, onConfirmNormalization }: SidebarProps) {
  const [label, setLabel] = useState("")
  const [description, setDescription] = useState("")

  // Update form values when selection changes
  useEffect(() => {
    if (selectedTiles.length === 0) {
      setLabel("")
      setDescription("")
      return
    }

    // Check if all selected tiles have the same values
    const allSameLabel = selectedTiles.every((tile) => tile.label === selectedTiles[0].label)
    const allSameDescription = selectedTiles.every((tile) => tile.description === selectedTiles[0].description)

    setLabel(allSameLabel ? selectedTiles[0].label : "(varied)")
    setDescription(allSameDescription ? selectedTiles[0].description : "(varied)")
  }, [selectedTiles])

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value)
    onUpdateTiles({ label: e.target.value })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    onUpdateTiles({ description: e.target.value })
  }

  // Update empty sidebar message to include left-click instructions
  if (selectedTiles.length === 0 && colors.length === 0) {
    return (
      <div className="w-96 border-l p-4 bg-white flex flex-col h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <div className="rounded-full bg-gray-100 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 2v5h5"></path>
              <path d="M21 6v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12l5 3Z"></path>
              <path d="M9.5 10.5 6 14h12l-3.5-3.5-2 2-3-3Z"></path>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium mb-1">Right-click to create a new tile</p>
            <p className="text-sm font-medium">Left-click to select a tile</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-96 border-l p-4 bg-white overflow-y-auto flex flex-col h-full">
      {/* Color Picker */}
      {colors.length > 0 && (
        <div className="mb-3">
          <MultiColorPicker
            colors={colors}
            onChange={onUpdateColors}
            confirmNormalization={onConfirmNormalization}
          />
        </div>
      )}

      {/* Tile Properties - only show if tiles are selected */}
      {selectedTiles.length > 0 && (
        <div className="mb-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={label}
                onChange={handleLabelChange}
                placeholder="Enter label"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter description"
                rows={3}
              />
            </div>

            <div className="w-full">
              <Button variant="destructive" onClick={onRemoveSelected} className="w-full">
                Remove Selected
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
