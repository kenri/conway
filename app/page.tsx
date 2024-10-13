'use client'

import Board from '@/components/Board'
import GameOptions from '@/components/GameOptions'
import { useGame } from '@/hooks/useGame'
import { useEffect } from 'react'

export default function Page() {
  const { isPlaying, next, simulationSpeed } = useGame()

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined

    if (isPlaying) {
      interval = setInterval(next, 1001 - simulationSpeed)

      return () => {
        if (interval) clearInterval(interval)
      }
    } else if (interval) {
      clearInterval(interval)
    }
  }, [isPlaying, next, simulationSpeed])

  return (
    <div className='grid grid-cols-5 grid-rows-5 gap-2 h-screen'>
      <GameOptions />

      <Board />
    </div>
  )
}
