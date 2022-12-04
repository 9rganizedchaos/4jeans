import React from 'react';
import styles from './PhotoCardList.module.scss';
import Masonry from '../Masonry/Masonry';

interface PhotoCardListProps {
  children: React.ReactElement[];
  className: string;
}

function PhotoCardList({ children, className }: PhotoCardListProps) {
  return (
    <div className={`${styles['list-wrapper']} ${className}`}>
      <Masonry gutter="10px">{children}</Masonry>
    </div>
  );
}

export default PhotoCardList;
