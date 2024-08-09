// components/Slider.tsx
import { useState, ChangeEvent } from 'react';

// Define prop types for the Slider component
interface SliderProps {
  min: number;
  max: number;
  step: number;
}

const Slider = ({ min, max, step }: SliderProps) => {
  const [value, setValue] = useState<number>(min);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
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

export default Slider;
