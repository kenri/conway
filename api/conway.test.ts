import {
  getEmptyCells,
  getNeighborsCoords,
  getNeighborsCount,
  getNextCells,
} from '@/api/conway'

describe('conway API', () => {
  test('Create empty grid', () => {
    const size = 2
    const grid = getEmptyCells(size)
    expect(grid.length).toBe(size)
    expect(grid[0].length).toBe(size)
    expect(grid).toStrictEqual([
      [
        { alive: false, neighbors: 0 },
        { alive: false, neighbors: 0 },
      ],
      [
        { alive: false, neighbors: 0 },
        { alive: false, neighbors: 0 },
      ],
    ])
  })

  test('Get neighbors', () => {
    const size = 3
    const neighbors = getNeighborsCoords({ x: 1, y: 1, gridSize: size })
    expect(neighbors).toStrictEqual([
      [0, 1],
      [0, 0],
      [0, 2],
      [2, 1],
      [2, 0],
      [2, 2],
      [1, 0],
      [1, 2],
    ])
  })

  test('Get neighbors at the top border', () => {
    const size = 3
    const neighbors = getNeighborsCoords({ x: 0, y: 0, gridSize: size })
    expect(neighbors).toStrictEqual([
      [1, 0],
      [1, 1],
      [0, 1],
    ])
  })

  test('Get neighbors at the bottom border', () => {
    const size = 3
    const neighbors = getNeighborsCoords({ x: 2, y: 2, gridSize: size })
    expect(neighbors).toStrictEqual([
      [1, 2],
      [1, 1],
      [2, 1],
    ])
  })

  test('Get neighbors count', () => {
    const size = 3
    const grid = getEmptyCells(size)

    const alive = [
      [1, 1],
      [1, 2],
    ]

    const cells = grid.map((row, i) =>
      row.map((cell, j) => ({
        ...cell,
        alive: !!alive.find(x => x[0] === i && x[1] === j),
      }))
    )

    expect(getNeighborsCount({ x: 2, y: 2, gridSize: size, cells })).toBe(2)
  })

  test('Get next cells', () => {
    const size = 3
    const grid = getEmptyCells(size)

    const alive = [
      [1, 1],
      [1, 2],
      [2, 1],
    ]

    const cells = grid.map((row, i) =>
      row.map((cell, j) => ({
        ...cell,
        alive: !!alive.find(x => x[0] === i && x[1] === j),
      }))
    )

    expect(getNextCells({ gridSize: size, cells })).toStrictEqual([
      [
        { alive: false, neighbors: 1 },
        { alive: false, neighbors: 2 },
        { alive: false, neighbors: 2 },
      ],
      [
        { alive: false, neighbors: 2 },
        { alive: true, neighbors: 2 },
        { alive: true, neighbors: 2 },
      ],
      [
        { alive: false, neighbors: 2 },
        { alive: true, neighbors: 2 },
        { alive: true, neighbors: 3 },
      ],
    ])
  })
})
