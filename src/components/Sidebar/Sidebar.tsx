import React, { useState } from 'react';
import { Inbox } from 'react-feather';
import styles from './Sidebar.module.scss';
import PhotoCard from '../PhotoCard/PhotoCard';
import useHorizontalScroll from '../../hooks/useHorizontalScroll';
import { Photo } from '../../types/photo';

interface SidebarProps {
  photos: any[];
  handleMoreBtnClick: () => void;
  handleLikeBtnClick: (photo: Photo) => void;
}

function Sidebar({ photos, handleMoreBtnClick, handleLikeBtnClick }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollAreaRef = useHorizontalScroll();

  const handleSidebarBtnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`${styles['sidebar-wrapper']} ${isOpen && styles.open}`}>
      <div className={styles['sidebar-btn-box']}>
        <button type="button" onClick={handleSidebarBtnClick}>
          <div className={`${styles['sidebar-btn-icon']} ${isOpen ? styles.open : styles.closed}`}>
            <span />
            <span />
            <span />
          </div>
        </button>
      </div>
      <div className={styles['sidebar-content']} ref={scrollAreaRef}>
        {photos.length > 0 ? (
          <ul>
            {photos.map((photo) => (
              <PhotoCard
                key={photo.imgUrl}
                {...photo}
                isOnLikedList
                isLiked
                handleMoreBtnClick={handleMoreBtnClick}
                handleLikeBtnClick={handleLikeBtnClick}
              />
            ))}
          </ul>
        ) : (
          <div className={styles['empty-content']}>
            <Inbox />
            <p>
              There are no photos you have &#34;liked&#34; yet.
              <br />
              Save the photo by clicking the like button in the upper right corner of the photo.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
