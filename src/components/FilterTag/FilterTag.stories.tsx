import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import FilterTag, { FilterType } from './FilterTag';
import styles from './FilterTag.module.scss';

export default {
  title: 'FilterTag',
  component: FilterTag,
} as ComponentMeta<typeof FilterTag>;

// eslint-disable-next-line react/function-component-definition,react/prop-types
const Template: ComponentStory<typeof FilterTag> = ({ filterName, brightnessValue }) => {
  const [isActive, setIsActive] = useState(true);

  const handleTagClick = (filter: FilterType, value?: number) => {
    setIsActive(!isActive);

    console.log(filter, value);
  };

  return (
    <div className={styles['sb-filter-tag-wrapper']}>
      <FilterTag
        isActive={isActive}
        handleFilterTagClick={() => handleTagClick('contrast', 100)}
        filterName={filterName}
        brightnessValue={brightnessValue}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  filterName: 'contrast',
  brightnessValue: 100,
};
