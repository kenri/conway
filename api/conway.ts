export type Cell = {
  alive: boolean
  neighbors: number
}

export type Grid = Array<Array<Cell>>

export const getEmptyCells = (gridSize: number): Grid => {
  return Array(gridSize).fill(
    Array(gridSize).fill({ alive: false, neighbors: 0 })
  )
}

export const getNeighborsCoords = ({
  x,
  y,
  gridSize,
}: {
  x: number
  y: number
  gridSize: number
}) => {
  const neighbors = []

  if (x > 0) {
    neighbors.push([x - 1, y])
    if (y > 0) neighbors.push([x - 1, y - 1])
    if (y < gridSize - 1) neighbors.push([x - 1, y + 1])
  }

  if (x < gridSize - 1) {
    neighbors.push([x + 1, y])
    if (y > 0) neighbors.push([x + 1, y - 1])
    if (y < gridSize - 1) neighbors.push([x + 1, y + 1])
  }

  if (y > 0) neighbors.push([x, y - 1])

  if (y < gridSize - 1) neighbors.push([x, y + 1])

  return neighbors
}

export const getNeighborsCount = ({
  x,
  y,
  gridSize,
  cells,
}: {
  x: number
  y: number
  gridSize: number
  cells: Grid
}) => {
  let aliveNeighbors = 0
  const neighbors = getNeighborsCoords({ x, y, gridSize })

  neighbors.forEach(([nx, ny]) => {
    if (cells[nx][ny].alive) aliveNeighbors++
  })

  return aliveNeighbors
}

export const getNextCells = ({
  gridSize,
  cells,
}: {
  gridSize: number
  cells: Grid
}) => {
  const newCells = []

  for (let i = 0; i < gridSize; i++) {
    const row = []

    for (let j = 0; j < gridSize; j++) {
      const neighbors = getNeighborsCount({
        x: i,
        y: j,
        gridSize: gridSize,
        cells,
      })
      let alive = cells[i][j].alive

      if (!alive && neighbors === 3) {
        alive = true
      } else {
        alive = alive && (neighbors === 2 || neighbors === 3)
      }
      row.push({ alive, neighbors })
    }

    newCells.push(row)
  }

  return newCells
}
