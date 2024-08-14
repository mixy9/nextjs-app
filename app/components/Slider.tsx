import { useState, ChangeEvent } from 'react';

type SliderProps = {
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
}

export default function Slider({ min, max, step, onValueChange }: SliderProps) {
  const [value, setValue] = useState<number>(min);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
      <p>Value: {value}</p>
    </div>
  );
};
