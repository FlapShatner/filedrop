import { useState } from 'react'
import { cn } from '../lib/cn'
type DurationOptionProps = {
 value: number
 label: string
 selected: number
 onChange: (value: number) => void
}

function DurationOption({ value, label, selected, onChange }: DurationOptionProps) {
 const isSelected = selected === value
 return (
  <div className={cn('flex items-center justify-center w-18 rounded-md', isSelected && 'bg-accent')}>
   <input
    type='radio'
    id={`duration-${value}`}
    name='duration'
    value={value}
    checked={isSelected}
    onChange={() => onChange(value)}
    className='hidden'
   />
   <label
    htmlFor={`duration-${value}`}
    className={cn('text-text opacity-40 text-sm font-raleway', isSelected && 'font-bold opacity-100')}>
    {label}
   </label>
  </div>
 )
}

function ExpireIn() {
 const [selectedDuration, setSelectedDuration] = useState(1)
 const durations = [
  { value: 1, label: '1 hour' },
  { value: 3, label: '3 hours' },
  { value: 6, label: '6 hours' },
  { value: 12, label: '12 hours' },
  { value: 24, label: '24 hours' },
  { value: 72, label: '3 days' },
 ]
 return (
  <div className='flex items-center justify-center mb-4'>
   <div>Expire In:</div>
   <div className='flex justify-center items-center  ml-4 rounded-lg bg-bg-secondary'>
    {durations.map((duration) => (
     <DurationOption
      key={duration.value}
      value={duration.value}
      label={duration.label}
      selected={selectedDuration}
      onChange={setSelectedDuration}
     />
    ))}
   </div>
  </div>
 )
}

export default ExpireIn
