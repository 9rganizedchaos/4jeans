import React, { ChangeEvent, RefObject, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import SearchBox from '../SearchBox/SearchBox';

interface HeaderProps {
  inputValue: string;
  scrollLayerRef: RefObject<HTMLDivElement> | null;
  handleEnterPressSearch: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCancelBtnClick: () => void;
}

function Header({
  scrollLayerRef,
  handleEnterPressSearch,
  handleInputChange,
  inputValue,
  handleCancelBtnClick,
}: HeaderProps) {
  const [isNavStuck, setIsNavStuck] = useState<boolean>(false);

  const checkScrollYOffset = (e: Event) => {
    // @ts-ignore
    if (e.target?.scrollTop > 100) {
      setIsNavStuck(true);
    } else {
      setIsNavStuck(false);
    }
  };

  useEffect(() => {
    if (scrollLayerRef?.current) {
      scrollLayerRef.current.addEventListener('scroll', (e) => checkScrollYOffset(e));
    }

    return () => {
      if (scrollLayerRef?.current) {
        scrollLayerRef.current.removeEventListener('scroll', (e) => checkScrollYOffset(e));
      }
    };
  }, []);

  return (
    <nav className={`${styles['header-wrapper']} ${isNavStuck && styles.folded}`}>
      <div className={styles['page-header']}>
        <h1>👖👖👖👖</h1>
        <p>
          Hello, welcome to 4Jeans. This is a photo finder app using Unsplash API. <br />
          Search for some high-quality photos you like. You can apply filters to the photos, and you can also download
          <br /> them. If you like this page, please visit my GitHub and hit Star. Thank you! :)
        </p>
        <SearchBox
          handleCancelBtnClick={handleCancelBtnClick}
          inputValue={inputValue}
          placeholder="search your photo!"
          handleInputChange={handleInputChange}
          handleEnterPress={handleEnterPressSearch}
          className={styles['main-page-search-box']}
        />
      </div>
    </nav>
  );
}

export default Header;
