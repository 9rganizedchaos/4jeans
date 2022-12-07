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

  return (
    <div className={styles['sb-header-bg']} ref={scrollLayerRef}>
      <Header scrollLayerRef={scrollLayerRef} handleEnterPressSearch={handleEnterPressSearch} />
    </div>
  );
}
