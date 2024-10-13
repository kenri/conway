import { getEmptyCells, getNextCells, Grid } from '@/api/conway'
import { create } from 'zustand'

type State = {
  gridSize: number
  cellSize: number
  liveColor: string
  deadColor: string
  generation: number
  cells: Grid
  isPlaying: boolean
  simulationSpeed: number
  showDivider: boolean
}

type Actions = {
  reset: () => void
  play: () => void
  pause: () => void
  setCell: (x: number, y: number, alive: boolean) => void
  next: () => void
  goToStep: (steps: number) => void
  setGridSize: (gridSize: number) => void
  setCellSize: (cellSize: number) => void
  setLiveColor: (liveColor: string) => void
  setDeadColor: (deadColor: string) => void
  setSimulationSpeed: (simulationSpeed: number) => void
  setShowDivider: (showDivider: boolean) => void
}

const DEFAULT_STATE: State = {
  gridSize: 50,
  cellSize: 10,
  liveColor: '#ffffff',
  deadColor: '#000000',
  generation: 0,
  cells: getEmptyCells(50),
  isPlaying: false,
  simulationSpeed: 1000,
  showDivider: true,
}

export const useGame = create<State & Actions>(set => ({
  ...DEFAULT_STATE,
  reset: () => set(DEFAULT_STATE),
  play: () => set(() => ({ isPlaying: true })),
  pause: () => set(() => ({ isPlaying: false })),
  setGridSize: (gridSize: number) =>
    set(() => ({ gridSize, cells: getEmptyCells(gridSize), generation: 0 })),
  setCellSize: (cellSize: number) => set(() => ({ cellSize })),
  setLiveColor: (liveColor: string) => set(() => ({ liveColor })),
  setDeadColor: (deadColor: string) => set(() => ({ deadColor })),
  setSimulationSpeed: (simulationSpeed: number) =>
    set(() => ({ simulationSpeed })),
  setShowDivider: (showDivider: boolean) => set(() => ({ showDivider })),
  setCell: (x, y, alive) =>
    set(state => ({
      cells: state.cells.map((row, i) =>
        i === x
          ? row.map((cell, j) => (j === y ? { ...cell, alive } : cell))
          : row
      ),
    })),
  next: () =>
    set(state => {
      return {
        cells: getNextCells({ gridSize: state.gridSize, cells: state.cells }),
        generation: state.generation + 1,
      }
    }),
  goToStep: (steps: number) =>
    set(state => {
      let cells = getNextCells({ gridSize: state.gridSize, cells: state.cells })

      for (let i = 0; i < steps - 1; i++) {
        cells = getNextCells({ gridSize: state.gridSize, cells })
      }

      return { cells, generation: state.generation + steps }
    }),
}))
