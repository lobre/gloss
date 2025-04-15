import type { AppState } from "@/lib/types"

export interface HistoryState {
  past: AppState[]
  present: AppState
  future: AppState[]
}

export function createHistoryState(initialState: AppState): HistoryState {
  return {
    past: [],
    present: initialState,
    future: [],
  }
}

export function canUndo(history: HistoryState): boolean {
  return history.past.length > 0
}

export function canRedo(history: HistoryState): boolean {
  return history.future.length > 0
}

export function undo(history: HistoryState): HistoryState {
  if (!canUndo(history)) return history

  const previous = history.past[history.past.length - 1]
  const newPast = history.past.slice(0, history.past.length - 1)

  return {
    past: newPast,
    present: previous,
    future: [history.present, ...history.future],
  }
}

export function redo(history: HistoryState): HistoryState {
  if (!canRedo(history)) return history

  const next = history.future[0]
  const newFuture = history.future.slice(1)

  return {
    past: [...history.past, history.present],
    present: next,
    future: newFuture,
  }
}

export function addToHistory(history: HistoryState, newState: AppState): HistoryState {
  // Don't add if the state is the same as the present
  if (
    history.present.background === newState.background &&
    history.present.items.length === newState.items.length &&
    JSON.stringify(history.present.items) === JSON.stringify(newState.items)
  ) {
    return history
  }

  // Limit history size to 10 items
  const newPast = [...history.past, history.present].slice(-10)

  return {
    past: newPast,
    present: newState,
    future: [],
  }
}
