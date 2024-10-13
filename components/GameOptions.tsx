'use client'

import StepJumper from '@/components/StepJumper'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { useGame } from '@/hooks/useGame'
import { ChevronFirst, ChevronRight, Pause, Play } from 'lucide-react'
import { ChangeEvent } from 'react'

export default function GameOptions() {
  const {
    simulationSpeed,
    isPlaying,
    gridSize,
    cellSize,
    liveColor,
    deadColor,
    showDivider,
    setGridSize,
    setCellSize,
    setLiveColor,
    setDeadColor,
    pause,
    play,
    reset,
    setSimulationSpeed,
    setShowDivider,
    next,
  } = useGame()

  const handleGridSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber
    if (value >= 10 && value <= 50) setGridSize(value)
  }

  const handleCellSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber
    if (value >= 8 && value <= 25) setCellSize(value)
  }

  return (
    <aside className='row-span-5 flex flex-col gap-4 p-4'>
      <p className='text-2xl'>Game Options</p>

      {isPlaying ? (
        <Button variant='outline' title='Pause' onClick={pause}>
          <Pause className='mr-2 h-4 w-4' /> Pause
        </Button>
      ) : (
        <Button variant='outline' title='Play' onClick={play}>
          <Play className='mr-2 h-4 w-4' /> Play
        </Button>
      )}

      <Button
        variant='outline'
        title='Next Generation'
        onClick={next}
        disabled={isPlaying}
      >
        <ChevronRight className='mr-2 h-4 w-4' /> Next Generation
      </Button>

      <Button
        variant='outline'
        title='Reset'
        onClick={reset}
        disabled={isPlaying}
      >
        <ChevronFirst className='mr-2 h-4 w-4' /> Reset
      </Button>

      <StepJumper />

      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='simulationSpeed'>Simulation Speed</Label>
        <Slider
          id='simulationSpeed'
          defaultValue={[1000]}
          min={1}
          max={1000}
          step={100}
          value={[simulationSpeed]}
          onValueChange={([value]) => setSimulationSpeed(value)}
        />
      </div>

      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='gridSize'>Grid Size</Label>
        <Input
          id='gridSize'
          type='number'
          onChange={handleGridSizeChange}
          value={gridSize}
          disabled={isPlaying}
        />
      </div>

      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='gridSize'>Cell Size</Label>
        <Input
          id='cellSize'
          type='number'
          onChange={handleCellSizeChange}
          value={cellSize}
          disabled={isPlaying}
        />
      </div>

      <div className='flex items-center space-x-2'>
        <Switch
          id='showDivider'
          checked={showDivider}
          onCheckedChange={setShowDivider}
        />
        <Label htmlFor='showDivider-mode'>Show grid lines</Label>
      </div>

      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='liveColor'>Live Color</Label>
        <ColorPicker
          id='liveColor'
          onChange={setLiveColor}
          value={liveColor}
          disabled={isPlaying}
        />
      </div>

      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='deadColor'>Dead Color</Label>
        <ColorPicker
          id='deadColor'
          onChange={setDeadColor}
          value={deadColor}
          disabled={isPlaying}
        />
      </div>
    </aside>
  )
}
