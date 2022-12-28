import React, { ChangeEvent } from 'react';
import styles from './RangeSlider.module.scss';

interface RangeSliderProps {
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  handleChangeSlider: (e: ChangeEvent<HTMLInputElement>) => void;
}

function RangeSlider({ defaultValue, min, max, step, handleChangeSlider }: RangeSliderProps) {
  return (
    <input
      className={styles['range-slider']}
      type="range"
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      onChange={(e) => handleChangeSlider(e)}
    />
  );
}

export default RangeSlider;
