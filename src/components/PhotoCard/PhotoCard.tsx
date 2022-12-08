import React, { useState } from 'react';
import { MapPin, Heart, ArrowUpCircle } from 'react-feather';
import styles from './PhotoCard.module.scss';
import { Photo } from '../../types/photo';

export interface PhotoCardProps {
  imgUrl: string;
  altText?: string;
  profileUrl?: string;
  username?: string | null;
  bio?: string | null;
  location?: string | null;
  color: string;
  isOnLikedList?: boolean;
  isLiked: boolean;
  handleMoreBtnClick: () => void;
  handleLikeBtnClick: (photo: Photo) => void;
}

function PhotoCard({
  handleMoreBtnClick,
  handleLikeBtnClick,
  isOnLikedList = false,
  isLiked,
  ...photo
}: PhotoCardProps) {
  const {
    imgUrl,
    altText,
    profileUrl = 'https://images.unsplash.com/profile-1609483876126-c002704cc7bdimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
    username = 'unknown',
    bio = 'This user did not leave a comment.',
    location = 'unknown',
    color,
  } = photo;

  const [isInfoBoxOn, setIsInfoBoxOn] = useState(false);

  const handleInfoBoxToggleClick = () => {
    setIsInfoBoxOn(!isInfoBoxOn);
  };

  return (
    <article className={styles['card-wrapper']}>
      <div
        className={`${styles['image-container']} ${isOnLikedList && styles['liked-list']}`}
        style={{ backgroundColor: color }}
      >
        <img src={imgUrl} alt={altText} />
      </div>
      <div className={styles['card-front']}>
        <div className={styles['card-header']}>
          <button type="button" onClick={() => handleLikeBtnClick(photo)}>
            <Heart width={24} height={24} className={`${isLiked ? styles.on : styles.off}`} />
          </button>
        </div>
        <div className={`${styles['card-info-box']} ${isInfoBoxOn ? styles.on : styles.off}`}>
          <div className={styles['info-header']}>
            <div className={styles.profile}>
              <img src={profileUrl} alt={`${username}'s profile pic`} />
              <p>{username}</p>
            </div>
            <button
              type="button"
              onClick={handleInfoBoxToggleClick}
              className={`${isInfoBoxOn ? styles.on : styles.off}`}
            >
              <ArrowUpCircle />
            </button>
          </div>
          <p className={styles.bio}>{bio}</p>
          <div className={styles.details}>
            <div className={styles.location}>
              <MapPin width={16} height={16} />
              <p>{location || 'unknown'}</p>
            </div>
            <button type="button" onClick={handleMoreBtnClick}>
              <em>more</em>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PhotoCard;

PhotoCard.defaultProps = {
  altText: 'test image',
  profileUrl:
    'https://images.unsplash.com/profile-1609483876126-c002704cc7bdimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
  username: 'unknown',
  bio: 'This user did not leave a comment.',
  location: 'unknown',
  isOnLikedList: false,
};
