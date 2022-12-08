import React from 'react';
import styles from './PhotoCardList.module.scss';
import Masonry from '../Masonry/Masonry';
import { Photo } from '../../types/photo';
import PhotoCard from '../PhotoCard/PhotoCard';

interface PhotoCardListProps {
  photoRepo: Photo[];
  className?: string;
  handleMoreBtnClick: () => void;
}

function PhotoCardList({ photoRepo, className, handleMoreBtnClick }: PhotoCardListProps) {
  return (
    <div className={`${styles['list-wrapper']} ${className}`}>
      <Masonry gutter="10px">
        {photoRepo.map((photo) => {
          return <PhotoCard key={photo.imgUrl} {...photo} handleMoreBtnClick={handleMoreBtnClick} />;
        })}
      </Masonry>
    </div>
  );
}

export default PhotoCardList;

PhotoCardList.defaultProps = {
  className: '',
};
