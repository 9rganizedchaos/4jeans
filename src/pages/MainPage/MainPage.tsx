import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'react-feather';
import styles from './MainPage.module.scss';
import { getPhotoList, searchPhotoList } from './request';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import Header from '../../components/Header/Header';
import PhotoCardList from '../../components/PhotoCardList/PhotoCardList';
import Sidebar from '../../components/Sidebar/Sidebar';
import Modal from '../../components/Modal/Modal';

import { Photo } from '../../types/photo';
import { simplifyData } from '../../utils/photo';

const LOCAL_STORAGE_KEY = '4jeans-liked-list';

function MainPage() {
  const likedListStore = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialLikedList = JSON.parse(likedListStore || JSON.stringify([]));

  const [searchParams, setSearchParams] = useSearchParams({ query: '' });
  const initialQuery = searchParams.get('query');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(!!initialQuery);
  const [inputValue, setInputValue] = useState<string>(initialQuery || '');
  const [query, setQuery] = useState<string>(initialQuery || '');
  const [page, setPage] = useState<number>(1);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [photoRepo, setPhotoRepo] = useState<Photo[]>([]);
  const [searchPhotoRepo, setSearchPhotoRepo] = useState<Photo[]>([]);
  const [likedPhotoRepo, setLikedPhotoRepo] = useState<Photo[]>(initialLikedList);

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
  const { isLoading: isPhotoSearchLoading } = useQuery(
    [
      'photo',
      'search',
      {
        searchPage,
        query,
      },
    ],
    () => searchPhotoList(searchPage, query),
    {
      onSuccess: (data) => {
        if (!data.data.results.length) {
          setSearchPhotoRepo([]);
          setSearchPage(1);
        }
        if (searchPhotoRepo.length / 20 === searchPage) return;
        setSearchPhotoRepo([...searchPhotoRepo, ...simplifyData(data.data.results)]);
      },
    }
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMoreBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCancelBtnClick = () => {
    setIsSearching(false);
    setSearchPhotoRepo([]);
    setSearchPage(1);
    setInputValue('');
    setSearchParams({});
  };

  const handleEnterPressSearch = () => {
    if (inputValue === '') {
      handleCancelBtnClick();
    } else {
      setSearchPhotoRepo([]);
      setIsSearching(true);
      setQuery(inputValue);
    }
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
      if (isSearching) {
        setSearchPage(searchPage + 1);
      } else {
        setPage(page + 1);
      }
    }
  }, [entry]);

  useEffect(() => {
    if (query.length) {
      setSearchParams({ query });
    }
  }, [query]);

  return (
    <div className={styles['page-wrapper']}>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className={styles['sb-modal-content']} />
      </Modal>
      <div className={styles['page-scroll-layer']} ref={scrollLayerRef}>
        <Header
          handleCancelBtnClick={handleCancelBtnClick}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleEnterPressSearch={handleEnterPressSearch}
          scrollLayerRef={scrollLayerRef}
        />
        <div className={styles['page-content']}>
          <div className={styles['card-list-wrapper']}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isPhotoListLoading || isPhotoSearchLoading ? null : (photoRepo.length === 0 && !isSearching) ||
              (searchPhotoRepo.length === 0 && isSearching) ? (
              <div className={styles['no-result']}>
                <Search />
                <p>
                  {`There are no photos for "${query}" yet.`}
                  <br />
                  Please try another search term.
                </p>
              </div>
            ) : (
              <PhotoCardList
                photoRepo={isSearching ? searchPhotoRepo : photoRepo}
                likedPhotoRepo={likedPhotoRepo}
                handleMoreBtnClick={handleMoreBtnClick}
                handleLikeBtnClick={handleLikeBtnClick}
              />
            )}
          </div>
          <div className={styles['data-fetching-sensor']} ref={dataFetchingSensorRef}>
            {(isPhotoListLoading || isPhotoSearchLoading) && 'Loading...'}
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
