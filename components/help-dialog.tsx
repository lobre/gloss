"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function HelpDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200"
      >
        <span className="text-base font-semibold">?</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gloss - Color Palette Designer</DialogTitle>
            <DialogDescription>A tool for designing color palettes with precision and accessibility</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <section>
              <h3 className="text-lg font-medium mb-2">About Gloss</h3>
              <p>
                Gloss is a tool for manually designing color palettes with precise control. Unlike automated palette
                generators, Gloss gives you complete control over your colors while providing helpful tools to ensure
                harmony and accessibility.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">Color Picker Modes</h3>
              <p className="mb-2">The color picker has two main modes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Wheel Mode:</strong> In this mode, all colors share the same lightness value, but can have
                  different hue and saturation values. This is useful for creating colors that have the same perceived
                  brightness.
                </li>
                <li>
                  <strong>Slider Mode:</strong> In this mode, all colors share the same hue and saturation values, but
                  can have different lightness values. This is useful for creating shades and tints of the same color.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">Color Spaces</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>HSL:</strong> The standard Hue, Saturation, Lightness color space. Simple but not perceptually
                  uniform.
                </li>
                <li>
                  <strong>OKHSL:</strong> A perceptually uniform color space that provides more consistent visual
                  results across the entire color spectrum.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">Keyboard Modifiers</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Hold <kbd className="px-1 py-0.5 bg-gray-100 border rounded">Shift</kbd> to constrain movement along
                  hue
                </li>
                <li>
                  Hold <kbd className="px-1 py-0.5 bg-gray-100 border rounded">Ctrl</kbd> to constrain movement along
                  saturation
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">Mouse & Keyboard Controls</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Right-click: Create a new tile</li>
                <li>Left-click: Select a tile</li>
                <li>Ctrl+click: Add to selection</li>
                <li>Click and drag: Select or move tiles</li>
                <li>Delete/Backspace: Remove selected tiles</li>
                <li>Undo (Ctrl+Z or undo button): Revert the last action</li>
                <li>Redo (Ctrl+Y or redo button): Restore the last undone action</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">Contrast Analysis</h3>
              <p>
                When you select two tiles or a tile and the background, Gloss automatically calculates the contrast
                ratio between them and shows WCAG accessibility compliance information.
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
