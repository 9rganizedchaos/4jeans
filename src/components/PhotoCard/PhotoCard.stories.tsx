import React from 'react';
import { ComponentMeta } from '@storybook/react';
import PhotoCard from './PhotoCard';
import styles from './PhotoCard.module.scss';

export default {
  title: 'PhotoCard',
  component: PhotoCard,
} as ComponentMeta<typeof PhotoCard>;

const verticalPhotoProps = {
  imgUrl:
    'https://images.unsplash.com/photo-1669137980057-379be721806c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODMyODh8MHwxfGFsbHwyfHx8fHx8Mnx8MTY2OTM3MzI3NA&ixlib=rb-4.0.3&q=80&w=1080',
  altText: '',
  profileUrl:
    'https://images.unsplash.com/profile-1609483876126-c002704cc7bdimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
  username: 'jayson_hinrichsen',
  bio: 'I am a Photographer from Sioux City, Iowa. I have been doing photography for about 4 years now. If you have any questions about photography feel free to DM me. \r\nP.S. if you like my work, feel free to send a donation. It’s greatly appreciated 🙏♥️ ',
  location: 'Des Moines, Iowa',
  color: '#c0c0a6',
};
const horizontalPhotoProps = {
  imgUrl:
    'https://images.unsplash.com/photo-1669234447681-1f9cdeaf7071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODMyODh8MHwxfGFsbHwzfHx8fHx8Mnx8MTY2OTM3MzI3NA&ixlib=rb-4.0.3&q=80&w=1080',
  altText: 'Lost in the orange.',
  profileUrl:
    'https://images.unsplash.com/profile-1604758536753-68fd6f23aaf7image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
  username: 'marekpiwnicki',
  bio: 'If you want to use my pics you need to: a) Respect the nature! b) Become vege! c) Be aware!  d) Stop polluting!\r\n(Just kidding. Thanks for using them in any form 👍) 🐷💰 > PayPal > ❤️🌍🌄🖥️🙌',
  location: 'Gdynia | Poland',
  color: '#d95926',
};

export function Vertical() {
  return (
    <div className={styles['sb-card-container']}>
      <PhotoCard {...verticalPhotoProps} />
    </div>
  );
}

export function Horizontal() {
  return (
    <div className={styles['sb-card-container']}>
      <PhotoCard {...horizontalPhotoProps} />
    </div>
  );
}
