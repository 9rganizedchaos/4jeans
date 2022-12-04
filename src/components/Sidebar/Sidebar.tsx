import React, { useState } from 'react';
import styles from './Sidebar.module.scss';
import PhotoCard from '../PhotoCard/PhotoCard';
import useHorizontalScroll from '../../hooks/useHorizontalScroll';

interface SidebarProps {
  photos: any[];
  handleMoreBtnClick: () => void;
}

function Sidebar({ photos, handleMoreBtnClick }: SidebarProps) {
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
        <ul>
          {photos.map((photo) => (
            <PhotoCard
              key={photo.urls.regular}
              imgUrl={photo.urls.regular}
              altText={photo.alt_description || 'test image'}
              bio={photo.user.bio}
              username={photo.user.username}
              location={photo.user.location}
              profileUrl={photo.user.profile_image.large}
              color={photo.color}
              handleMoreBtnClick={handleMoreBtnClick}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
