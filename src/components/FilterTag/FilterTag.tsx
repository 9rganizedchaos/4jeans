import React from 'react';
import styles from './FilterTag.module.scss';

export type FilterType = 'contrast' | 'grayscale' | 'sepia' | 'brightness';

interface FilterTagProps {
  filterName: FilterType;
  isActive: boolean;
  brightnessValue: number;
  handleFilterTagClick: (filter: FilterType, value?: number) => void;
}

function FilterTag({ filterName, isActive, brightnessValue, handleFilterTagClick }: FilterTagProps) {
  return (
    <button
      type="button"
      onClick={() => handleFilterTagClick(filterName, brightnessValue)}
      className={`${styles['filter-tag']} ${isActive && styles.active}`}
    >
      {filterName}
    </button>
  );
}

export default FilterTag;
