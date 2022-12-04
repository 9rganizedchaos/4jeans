import React from 'react';
import { ComponentMeta } from '@storybook/react';
import SearchBox from './SearchBox';
import styles from './SearchBox.module.scss';

export default {
  title: 'SearchBox',
  component: SearchBox,
} as ComponentMeta<typeof SearchBox>;

export function Default() {
  const handleEnterPress = () => {
    console.log('Enter Key Pressed!');
  };

  return (
    <div className={styles['sb-search-box-wrapper']}>
      <SearchBox placeholder="search your photo!" handleEnterPress={handleEnterPress} />
    </div>
  );
}
