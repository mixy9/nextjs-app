'use client'

import { useState, ChangeEvent, FC } from 'react'

type UiSliderProps = {
  min: number
  max: number
  step: number
  onValueChange: (value: number) => void
}

const UiSlider: FC<UiSliderProps> = ({
  min,
  max,
  step,
  onValueChange,
}: UiSliderProps) => {
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

export default UiSlider
