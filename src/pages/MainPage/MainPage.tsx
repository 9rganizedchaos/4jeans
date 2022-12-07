import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './MainPage.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import MOCK_PHOTOS from '../../mocks/images';
import PhotoCardList from '../../components/PhotoCardList/PhotoCardList';
import PhotoCard from '../../components/PhotoCard/PhotoCard';
import Modal from '../../components/Modal/Modal';
import { getPhotoList } from './request';
import { Photo } from '../../types/photo';
import { simplifyData } from '../../utils/photo';
import Header from '../../components/Header/Header';

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [photoRepo, setPhotoRepo] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);

  const scrollLayerRef = useRef<HTMLDivElement>(null);

  const { isLoading: isPhotoListLoading } = useQuery(['photo', 'list'], () => getPhotoList(page), {
    onSuccess: (data) => {
      setPhotoRepo([...photoRepo, ...simplifyData(data.data)]);
      setPage(page + 1);
    },
  });

  const handleEnterPressSearch = () => {
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
      <div className={styles['page-scroll-layer']} ref={scrollLayerRef}>
        <Header handleEnterPressSearch={handleEnterPressSearch} scrollLayerRef={scrollLayerRef} />
        <div className={styles['page-content']}>
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
