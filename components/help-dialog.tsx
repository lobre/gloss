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

          <div className="space-y-6 mt-4">
            <section>
              <h3 className="text-lg font-bold mb-2">About Gloss</h3>
              <p>
                Gloss is a minimal tool to handcraft color palettes with precision. It helps you design and fine-tune individual colors while ensuring consistency and harmony across a full palette. Gloss offers fine-grained HSL control, smart multi-selection behavior, and built-in contrast checking for accessibility.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Interface Overview</h3>
              <p className="mb-2">Gloss is composed of four main zones:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Canvas (left)</strong> — your main workspace where you create and organize color tiles.</li>
                <li><strong>Sidebar (right)</strong> — a color picker and metadata editor for selected tiles.</li>
                <li><strong>Topbar (top)</strong> — general controls: canvas background, reset, export, and share.</li>
                <li><strong>Bottombar (bottom)</strong> — contrast ratio checker for accessibility.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Canvas Basics</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Right-click on empty space to create a new tile with a random color.</li>
                <li>Left-click and drag a tile to move it freely around the canvas.</li>
                <li>Left-click a tile to select it and open it in the sidebar for editing.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Sidebar: Single Color Editing</h3>
              <h4 className="text-base font-bold mb-2">When a tile is selected:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>The color picker allows precise editing using HSL:
                  <ul className="list-disc pl-5 mt-2">
                    <li>Hue & saturation via the wheel</li>
                    <li>Lightness via the slider</li>
                  </ul>
                </li>
                <li>You can also input values directly in hex, h, s, or l fields.</li>
                <li>Click the preview tile to copy the current color's hex value to the clipboard.</li>
                <li>The tile's label and description can be edited below the picker.</li>
              </ul>
              <h4 className="text-base font-bold mt-4 mb-2">In the wheel:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Hold <kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-sm">Ctrl</kbd> to lock saturation while moving markers.</li>
                <li>Hold <kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-sm">Shift</kbd> to lock hue.</li>
              </ul>
              <p className="mt-4">
                You can also switch to okHSL mode using the toolbar toggle. okHSL is a perceptually uniform color space that preserves consistent visual lightness, which can be useful when designing with contrast in mind.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Multiple Selection & Group Editing</h3>
              <h4 className="text-base font-bold mb-2">You can edit multiple tiles at once:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-sm">Ctrl</kbd>+Click to add or remove tiles from a selection.</li>
                <li>Click and drag to draw a selection box.</li>
                <li><kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-sm">Ctrl</kbd>+Right-click on empty space to create a new tile inside the current selection.</li>
              </ul>
              <p className="mt-4 mb-2">When multiple tiles are selected, a virtual group is formed. The picker enforces a shared constraint across the selection:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Wheel mode: all colors share the same lightness.</li>
                <li>Slider mode: all colors share the same hue and saturation.</li>
              </ul>
              <p className="mt-4">
                The mode is automatically selected based on the current colors but can be changed manually via the toolbar.
              </p>
              <h4 className="text-base font-bold mt-4 mb-2">While in group mode:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>You'll see multiple markers on the wheel or slider, depending on the mode.</li>
                <li>Use the spread controls to evenly distribute the selection by:
                  <ul className="list-disc pl-5 mt-2">
                    <li>Hue</li>
                    <li>Saturation</li>
                    <li>Lightness</li>
                  </ul>
                </li>
                <li>Changes to label or description will apply to all selected tiles.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Contrast Checker</h3>
              <p className="mb-2">Located in the bottom bar:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>If one tile is selected, contrast is calculated against the canvas background.</li>
                <li>If two tiles are selected, contrast is calculated between them.</li>
                <li>If more than two, the checker is hidden.</li>
                <li>You can manually pick a second color for comparison by right-clicking another tile while one is selected.</li>
              </ul>
              <p className="mt-4">Contrast levels are evaluated using WCAG AA and AAA standards.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Export & Share</h3>
              <p className="mb-2">Gloss provides two ways to save or share your palette:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Export:</strong> Save the palette as a JSON file containing each tile's hex value, label, and description.</li>
                <li><strong>Copy URL:</strong> Generate a shareable link encoding the full canvas state.
                  <p className="mt-2 text-sm text-gray-600">Note: long palettes will result in long URLs, which may not be supported by all browsers.</p>
                </li>
              </ul>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
