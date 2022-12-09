import React, { useRef } from 'react';
import { ComponentMeta } from '@storybook/react';
import Header from './Header';
import styles from './Header.module.scss';

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>;

export function Default() {
  const scrollLayerRef = useRef<HTMLDivElement>(null);

  const handleEnterPressSearch = () => {
    console.log('Enter Pressed!');
  };
  const handleInputChange = () => {
    console.log('Input Changed!');
  };
  const handleCancelBtnClick = () => {
    console.log('Cancel Button Clicked!');
  };

  return (
    <div className={styles['sb-header-bg']} ref={scrollLayerRef}>
      <Header
        handleCancelBtnClick={handleCancelBtnClick}
        inputValue=""
        scrollLayerRef={scrollLayerRef}
        handleEnterPressSearch={handleEnterPressSearch}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
