import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useGame } from '@/hooks/useGame'
import { PopoverClose } from '@radix-ui/react-popover'
import { useState } from 'react'

export default function StepJumper() {
  const { goToStep, isPlaying } = useGame()
  const [steps, setSteps] = useState(1)

  const handleAccept = () => {
    if (steps > 0) {
      goToStep(steps)
      setSteps(1)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' disabled={isPlaying}>
          Advance # steps
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Advance # steps</h4>
            <p className='text-sm text-muted-foreground'>
              Advance a number of steps
            </p>
          </div>
          <div className='grid gap-4'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='steps'>Steps</Label>
              <Input
                autoFocus
                id='steps'
                className='col-span-2 h-8'
                type='number'
                value={steps}
                onChange={e =>
                  e.target.valueAsNumber > 0
                    ? setSteps(e.target.valueAsNumber)
                    : null
                }
              />
            </div>

            <PopoverClose onClick={handleAccept}>Accept</PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
