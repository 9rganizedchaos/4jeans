import React from 'react';
import styles from './PhotoCardList.module.scss';
import Masonry from '../Masonry/Masonry';
import { Photo } from '../../types/photo';
import PhotoCard from '../PhotoCard/PhotoCard';

interface PhotoCardListProps {
  photoRepo: Photo[];
  likedPhotoRepo: Photo[];
  className?: string;
  handleMoreBtnClick: () => void;
  handleLikeBtnClick: (photo: Photo) => void;
}

function PhotoCardList({
  photoRepo,
  likedPhotoRepo,
  className,
  handleMoreBtnClick,
  handleLikeBtnClick,
}: PhotoCardListProps) {
  return (
    <div className={`${styles['list-wrapper']} ${className}`}>
      <Masonry gutter="10px">
        {photoRepo.map((photo) => {
          return (
            <PhotoCard
              key={photo.imgUrl}
              {...photo}
              isLiked={!!likedPhotoRepo.find((likedPhoto) => likedPhoto.imgUrl === photo.imgUrl)}
              handleMoreBtnClick={handleMoreBtnClick}
              handleLikeBtnClick={handleLikeBtnClick}
            />
          );
        })}
      </Masonry>
    </div>
  );
}

export default PhotoCardList;

PhotoCardList.defaultProps = {
  className: '',
};
