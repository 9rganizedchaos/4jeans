import React from 'react';
import { ComponentMeta } from '@storybook/react';
import PhotoCardList from './PhotoCardList';
import MOCK_PHOTOS from '../../mocks/images';
import PhotoCard from '../PhotoCard/PhotoCard';
import styles from './PhotoCardList.module.scss';

export default {
  title: 'PhotoCardList',
  component: PhotoCardList,
} as ComponentMeta<typeof PhotoCardList>;

export function Default() {
  return (
    <PhotoCardList className={styles['sb-list-wrapper']}>
      {MOCK_PHOTOS.map((photo) => (
        <PhotoCard
          key={photo.urls.regular}
          imgUrl={photo.urls.regular}
          altText={photo.alt_description || 'test image'}
          bio={photo.user.bio}
          username={photo.user.username}
          location={photo.user.location}
          profileUrl={photo.user.profile_image.large}
          color={photo.color}
        />
      ))}
    </PhotoCardList>
  );
}
