import Square from '@/components/Square'
import { useGame } from '@/hooks/useGame'

export default function Board() {
  const { cells, gridSize, cellSize, generation, showDivider } = useGame()

  const gap = showDivider ? '1px' : 0
  const width = gridSize * (cellSize + (showDivider ? 1 : 0))

  return (
    <div className='col-span-4 row-span-5 flex flex-col items-center justify-center gap-4'>
      <div className='text-2xl'>Generation: {generation}</div>
      <div
        className={`flex flex-col bg-slate-50`}
        style={{ width, height: width, gap }}
      >
        {cells.map((row, i) => (
          <div
            key={`${i}`}
            className={`flex flex-row bg-slate-50`}
            style={{ gap }}
          >
            {row.map((cell, j) => (
              <Square key={`${i}${j}`} x={i} y={j} cell={cell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
