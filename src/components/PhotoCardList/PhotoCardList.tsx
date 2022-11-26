import React from 'react';
import styles from "./PhotoCardList.module.scss";
import Masonry from "../Masonry/Masonry";
import PhotoCard from "../PhotoCard/PhotoCard";

interface PhotoCardListProps {
  children: React.ReactElement[];
}

const PhotoCardList = ({children}: PhotoCardListProps) => {
  return (
    <div className={styles.list_wrapper}>
      <Masonry gutter="10px">
        {children}
      </Masonry>
    </div>
  )
}

export default PhotoCardList;
