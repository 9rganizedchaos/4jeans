import React from 'react';
import { ComponentMeta } from '@storybook/react';
import PhotoCardList from './PhotoCardList';
import MOCK_PHOTOS from '../../mocks/images';
import styles from './PhotoCardList.module.scss';
import { simplifyData } from '../../utils/photo';

export default {
  title: 'PhotoCardList',
  component: PhotoCardList,
} as ComponentMeta<typeof PhotoCardList>;

export function Default() {
  const handleMoreBtnClick = () => {
    console.log('More button clicked');
  };

  return (
    <PhotoCardList
      photoRepo={simplifyData(MOCK_PHOTOS)}
      className={styles['sb-list-wrapper']}
      handleMoreBtnClick={handleMoreBtnClick}
    />
  );
}
