import React, { useState } from 'react';
import styles from './MainPage.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import MOCK_PHOTOS from '../../mocks/images';
import SearchBox from '../../components/SearchBox/SearchBox';
import PhotoCardList from '../../components/PhotoCardList/PhotoCardList';
import PhotoCard from '../../components/PhotoCard/PhotoCard';
import Modal from '../../components/Modal/Modal';

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEnterPress = () => {
    console.log('Enter Pressed!');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMoreBtnClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles['page-wrapper']}>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className={styles['sb-modal-content']} />
      </Modal>
      <div className={styles['page-scroll-layer']}>
        <div className={styles['page-content']}>
          <div className={styles['page-header']}>
            <h1>👖👖👖👖</h1>
            <p>
              Hello, welcome to 4Jeans. This is a photo finder app using Unsplash API. <br />
              Search for some high-quality photos you like. You can apply filters to the photos, and you can also
              download
              <br /> them. If you like this page, please visit my GitHub and hit Star. Thank you! :)
            </p>
            <SearchBox
              placeholder="search your photo!"
              handleEnterPress={handleEnterPress}
              className={styles['main-page-search-box']}
            />
          </div>
          <div className={styles['card-list-wrapper']}>
            <PhotoCardList>
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
                  handleMoreBtnClick={handleMoreBtnClick}
                />
              ))}
            </PhotoCardList>
          </div>
        </div>
      </div>
      <Sidebar photos={MOCK_PHOTOS} handleMoreBtnClick={handleMoreBtnClick} />
    </div>
  );
}

export default MainPage;
