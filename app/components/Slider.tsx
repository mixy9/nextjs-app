'use client'

import { useState, ChangeEvent } from 'react'

type SliderProps = {
  min: number
  max: number
  step: number
  onValueChange: (value: number) => void
}

export default function Slider({ min, max, step, onValueChange }: SliderProps) {
  const [value, setValue] = useState<number>(max)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setValue(newValue)
    onValueChange(newValue)
  }

  return (
    <div className="w-56 flex gap-3 items-center justify-center mx-auto">
      <input
        id="steps-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <label
        htmlFor="steps-range"
        className="block text-sm font-bold text-gray-900 dark:text-white"
      >
        {value}
      </label>
    </div>
  )
}
