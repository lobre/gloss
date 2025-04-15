"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface HexProps {
  value: string
  onChange?: (value: string) => void
  placeholder?: string
}

export function Hex({ value, onChange, placeholder = "000000" }: HexProps) {
  const [localValue, setLocalValue] = useState(value.replace(/^#/, ""))

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value.replace(/^#/, ""))
  }, [value])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove "#" if present and filter out non-hex characters
    const filtered = e.target.value
      .replace(/^#/, "")
      .replace(/[^0-9a-fA-F]/g, "")
      .toLowerCase()

    // Limit to 6 characters
    const trimmed = filtered.slice(0, 6)
    setLocalValue(trimmed)

    // Only call onChange if we have a complete hex color
    if (trimmed.length === 6 && onChange) {
      onChange(`#${trimmed}`)
    }
  }

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium mr-1">#</span>
      <Input
        value={localValue}
        onChange={handleChange}
        className="font-mono w-20 text-center"
        placeholder={placeholder}
      />
    </div>
  )
}
