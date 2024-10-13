import { Cell } from '@/api/conway'
import { useGame } from '@/hooks/useGame'

type Props = {
  x: number
  y: number
  cell: Cell
}

export default function Square({ x, y, cell }: Props) {
  const { cellSize, setCell, liveColor, deadColor } = useGame()

  const handleClick = () => {
    setCell(x, y, !cell.alive)
  }

  return (
    <div
      className='cursor-pointer'
      style={{
        backgroundColor: cell.alive ? liveColor : deadColor,
        width: cellSize,
        height: cellSize,
      }}
      onClick={handleClick}
    />
  )
}
