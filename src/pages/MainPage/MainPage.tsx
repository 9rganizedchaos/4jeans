import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './MainPage.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import PhotoCardList from '../../components/PhotoCardList/PhotoCardList';
import Modal from '../../components/Modal/Modal';
import { getPhotoList } from './request';
import { Photo } from '../../types/photo';
import { simplifyData } from '../../utils/photo';
import Header from '../../components/Header/Header';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const LOCAL_STORAGE_KEY = '4jeans-liked-list';

function MainPage() {
  const likedListStore = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialLikedList = JSON.parse(likedListStore || JSON.stringify([]));

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [photoRepo, setPhotoRepo] = useState<Photo[]>([]);
  const [likedPhotoRepo, setLikedPhotoRepo] = useState<Photo[]>(initialLikedList);
  const [page, setPage] = useState<number>(1);

  const scrollLayerRef = useRef<HTMLDivElement>(null);
  const dataFetchingSensorRef = useRef<HTMLDivElement>(null);

  const entry = useIntersectionObserver(dataFetchingSensorRef, {
    threshold: 0.2,
  });

  const { isLoading: isPhotoListLoading } = useQuery(['photo', 'list', { page }], () => getPhotoList(page), {
    onSuccess: (data) => {
      if (photoRepo.length / 20 === page) return;
      setPhotoRepo([...photoRepo, ...simplifyData(data.data)]);
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
  const handleLikeBtnClick = (photo: Photo) => {
    if (likedPhotoRepo.find((likedPhoto) => likedPhoto.imgUrl === photo.imgUrl)) {
      const removedLikedPhotoRepo = likedPhotoRepo.filter((likedPhoto) => likedPhoto.imgUrl !== photo.imgUrl);

      setLikedPhotoRepo(removedLikedPhotoRepo);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(removedLikedPhotoRepo));
    } else {
      const updatedLikedPhotoRepo = [...likedPhotoRepo, photo];

      setLikedPhotoRepo(updatedLikedPhotoRepo);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLikedPhotoRepo));
    }
  };

  useEffect(() => {
    if (entry) {
      setPage(page + 1);
    }
  }, [entry]);

  return (
    <div className={styles['page-wrapper']}>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className={styles['sb-modal-content']} />
      </Modal>
      <div className={styles['page-scroll-layer']} ref={scrollLayerRef}>
        <Header handleEnterPressSearch={handleEnterPressSearch} scrollLayerRef={scrollLayerRef} />
        <div className={styles['page-content']}>
          <div className={styles['card-list-wrapper']}>
            {photoRepo.length === 0 ? null : (
              <PhotoCardList
                photoRepo={photoRepo}
                likedPhotoRepo={likedPhotoRepo}
                handleMoreBtnClick={handleMoreBtnClick}
                handleLikeBtnClick={handleLikeBtnClick}
              />
            )}
          </div>
          <div className={styles['data-fetching-sensor']} ref={dataFetchingSensorRef}>
            {isPhotoListLoading && 'Loading...'}
          </div>
        </div>
      </div>
      <Sidebar
        photos={likedPhotoRepo}
        handleMoreBtnClick={handleMoreBtnClick}
        handleLikeBtnClick={handleLikeBtnClick}
      />
    </div>
  );
}

export default MainPage;
