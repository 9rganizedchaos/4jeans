import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './MainPage.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import MOCK_PHOTOS from '../../mocks/images';
import SearchBox from '../../components/SearchBox/SearchBox';
import PhotoCardList from '../../components/PhotoCardList/PhotoCardList';
import PhotoCard from '../../components/PhotoCard/PhotoCard';
import Modal from '../../components/Modal/Modal';
import { getPhotoList } from './request';
import { Photo } from '../../types/photo';
import { simplifyData } from '../../utils/photo';

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [photoRepo, setPhotoRepo] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);

  const { isLoading: isPhotoListLoading } = useQuery(['photo', 'list'], () => getPhotoList(page), {
    onSuccess: (data) => {
      setPhotoRepo([...photoRepo, ...simplifyData(data.data)]);
      setPage(page + 1);
    },
  });

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
            {isPhotoListLoading ? (
              'Loading...'
            ) : (
              <PhotoCardList>
                {photoRepo.map((photo) => (
                  <PhotoCard {...photo} key={photo.imgUrl} handleMoreBtnClick={handleMoreBtnClick} />
                ))}
              </PhotoCardList>
            )}
          </div>
        </div>
      </div>
      <Sidebar photos={MOCK_PHOTOS} handleMoreBtnClick={handleMoreBtnClick} />
    </div>
  );
}

export default MainPage;
