"use client"

import { useState } from "react"
import type { AppState } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { HelpDialog } from "@/components/help-dialog"
import { ConfirmationDialog } from "@/components/confirmation-dialog"
import { Undo2, Redo2 } from "lucide-react"

interface TopbarProps {
  backgroundColor: string
  onBackgroundColorChange: (color: string) => void
  onBackgroundSelect: () => void
  onReset: () => void
  getExportData: () => AppState
  getUrlEncodedState: () => string
  onUndo?: () => void
  onRedo?: () => void
  canUndo?: boolean
  canRedo?: boolean
  showUndoRedo?: boolean
  hasTiles?: boolean
}

export function Topbar({
  backgroundColor,
  onBackgroundColorChange,
  onBackgroundSelect,
  onReset,
  getExportData,
  getUrlEncodedState,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  showUndoRedo = false,
  hasTiles = false,
}: TopbarProps) {
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [showUrlDialog, setShowUrlDialog] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [exportData, setExportData] = useState("")
  const [urlData, setUrlData] = useState("")
  const { showToast, ToastContainer } = useToast()

  const handleExportJSON = () => {
    const data = getExportData()
    // Only include label, description, and color in the export
    const simplifiedData = {
      background: data.background,
      items: data.items.map(({ label, description, color }) => ({
        label,
        description,
        color,
      })),
    }
    setExportData(JSON.stringify(simplifiedData, null, 2))
    setShowExportDialog(true)
  }

  const handleCopyURL = () => {
    setUrlData(`${window.location.origin}${window.location.pathname}#${getUrlEncodedState()}`)
    setShowUrlDialog(true)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast("Copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <>
      <div className="h-14 border-b bg-white flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg">Gloss</h1>
          <HelpDialog />
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <div className="flex items-center gap-2">
            <Label htmlFor="bg-color" className="text-sm">
              Background:
            </Label>
            <div
              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
              style={{ backgroundColor }}
              onClick={onBackgroundSelect}
              title="Click to edit background color"
            />
          </div>

          {/* Only show undo/redo buttons when there's a selection */}
          {onUndo && onRedo && showUndoRedo && (
            <>
              <div className="h-6 w-px bg-gray-300 mx-2" />
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onUndo}
                  disabled={!canUndo}
                  className="h-8 w-8"
                  title="Undo color change"
                >
                  <Undo2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRedo}
                  disabled={!canRedo}
                  className="h-8 w-8"
                  title="Redo color change"
                >
                  <Redo2 className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasTiles && (
            <>
              <Button variant="outline" size="sm" onClick={() => setShowResetDialog(true)}>
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportJSON}>
                Export JSON
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopyURL}>
                Copy URL
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Export JSON Dialog */}
      <Dialog open={showExportDialog} onOpenChange={(open) => {
        setShowExportDialog(open)
        if (!open) {
          // Restore focus to the canvas after dialog closes
          setTimeout(() => {
            const canvasDiv = document.querySelector('.relative.overflow-auto.flex-1')
            if (canvasDiv) {
              (canvasDiv as HTMLElement).focus()
            }
          }, 0)
        }
      }}>
        <DialogContent className="max-w-2xl" aria-describedby="export-dialog-description">
          <DialogHeader>
            <DialogTitle>Export JSON</DialogTitle>
            <DialogDescription id="export-dialog-description">Copy this JSON data to use in your application</DialogDescription>
          </DialogHeader>
          <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[60vh] mb-4">
            <pre className="text-sm">{exportData}</pre>
          </div>
          <DialogFooter>
            <Button onClick={() => copyToClipboard(exportData)}>Copy to Clipboard</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Copy URL Dialog */}
      <Dialog open={showUrlDialog} onOpenChange={(open) => {
        setShowUrlDialog(open)
        if (!open) {
          // Restore focus to the canvas after dialog closes
          setTimeout(() => {
            const canvasDiv = document.querySelector('.relative.overflow-auto.flex-1')
            if (canvasDiv) {
              (canvasDiv as HTMLElement).focus()
            }
          }, 0)
        }
      }}>
        <DialogContent className="max-w-2xl" aria-describedby="url-dialog-description">
          <DialogHeader>
            <DialogTitle>Share URL</DialogTitle>
            <DialogDescription id="url-dialog-description">Copy this URL to share your color palette</DialogDescription>
          </DialogHeader>
          <div className="bg-gray-100 p-4 rounded-md overflow-auto mb-4">
            <p className="text-sm break-all">{urlData}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => copyToClipboard(urlData)}>Copy to Clipboard</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        isOpen={showResetDialog}
        onClose={() => {
          setShowResetDialog(false)
          // Restore focus to the canvas after dialog closes
          setTimeout(() => {
            const canvasDiv = document.querySelector('.relative.overflow-auto.flex-1')
            if (canvasDiv) {
              (canvasDiv as HTMLElement).focus()
            }
          }, 0)
        }}
        onConfirm={() => {
          onReset()
          setShowResetDialog(false)
        }}
        title="Reset Canvas"
        message="Are you sure you want to reset the canvas? This will remove all colors and cannot be undone."
      />

      <ToastContainer />
    </>
  )
}
