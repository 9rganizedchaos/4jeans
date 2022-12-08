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
  const handleLikeBtnClick = () => {
    console.log('Like button clicked');
  };

  return (
    <PhotoCardList
      handleLikeBtnClick={handleLikeBtnClick}
      likedPhotoRepo={simplifyData(MOCK_PHOTOS)}
      photoRepo={simplifyData(MOCK_PHOTOS)}
      className={styles['sb-list-wrapper']}
      handleMoreBtnClick={handleMoreBtnClick}
    />
  );
}
