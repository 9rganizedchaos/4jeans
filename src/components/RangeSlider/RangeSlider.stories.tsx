import React, { ChangeEvent } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import RangeSlider from './RangeSlider';
import styles from './RangeSlider.module.scss';

export default {
  title: 'RangeSlider',
  component: RangeSlider,
} as ComponentMeta<typeof RangeSlider>;

// eslint-disable-next-line react/function-component-definition,react/prop-types
const Template: ComponentStory<typeof RangeSlider> = ({ defaultValue, min, max, step }) => {
  const handleChangeSlider = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <div className={styles['sb-range-slider-wrapper']}>
      <div className={styles['sb-range-slider-width-fixer']}>
        <RangeSlider
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          handleChangeSlider={(e: ChangeEvent<HTMLInputElement>) => handleChangeSlider(e)}
        />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: 0,
  min: -100,
  max: 100,
  step: 10,
};
