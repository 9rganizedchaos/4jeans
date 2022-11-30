import React from 'react';
import styles from './PhotoCardList.module.scss';
import Masonry from '../Masonry/Masonry';

interface PhotoCardListProps {
  children: React.ReactElement[];
}

function PhotoCardList({ children }: PhotoCardListProps) {
  return (
    <div className={styles['list-wrapper']}>
      <Masonry gutter="10px">{children}</Masonry>
    </div>
  );
}

export default PhotoCardList;
