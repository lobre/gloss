// Simple color history system that only tracks colors for the current selection

export interface ColorHistoryState {
  past: string[][]
  present: string[]
  future: string[][]
}

export function createColorHistory(initialColors: string[]): ColorHistoryState {
  return {
    past: [],
    present: initialColors,
    future: [],
  }
}

export function addColorToHistory(history: ColorHistoryState, newColors: string[]): ColorHistoryState {
  // Only add to history if the colors are different from the current state
  if (areColorArraysEqual(history.present, newColors)) {
    return history
  }

  return {
    past: [...history.past, history.present],
    present: newColors,
    future: [],
  }
}

export function undoColorChange(history: ColorHistoryState): ColorHistoryState {
  if (history.past.length === 0) return history

  const previous = history.past[history.past.length - 1]
  const newPast = history.past.slice(0, history.past.length - 1)

  return {
    past: newPast,
    present: previous,
    future: [history.present, ...history.future],
  }
}

export function redoColorChange(history: ColorHistoryState): ColorHistoryState {
  if (history.future.length === 0) return history

  const next = history.future[0]
  const newFuture = history.future.slice(1)

  return {
    past: [...history.past, history.present],
    present: next,
    future: newFuture,
  }
}

export function canUndoColor(history: ColorHistoryState): boolean {
  return history.past.length > 0
}

export function canRedoColor(history: ColorHistoryState): boolean {
  return history.future.length > 0
}

export function resetColorHistory(colors: string[]): ColorHistoryState {
  return createColorHistory(colors)
}

// Helper function to compare color arrays
function areColorArraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false
  return arr1.every((color, index) => color === arr2[index])
}
