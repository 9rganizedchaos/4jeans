import React, { ChangeEvent, KeyboardEvent } from 'react';
import { Search, X } from 'react-feather';
import styles from './SearchBox.module.scss';

interface SearchBoxProps {
  inputValue: string;
  placeholder: string;
  handleEnterPress: () => void;
  className?: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCancelBtnClick: () => void;
}

function SearchBox({
  placeholder,
  handleEnterPress,
  className,
  handleInputChange,
  inputValue,
  handleCancelBtnClick,
}: SearchBoxProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleEnterPress();
    }
  };

  return (
    <div className={`${styles['search-box-wrapper']} ${className}`}>
      <Search className={styles['search-icon']} />
      <input value={inputValue} placeholder={placeholder} onChange={handleInputChange} onKeyDown={handleKeyPress} />
      <button type="button" className={styles['cancel-btn']} onClick={handleCancelBtnClick}>
        <X />
      </button>
    </div>
  );
}

export default SearchBox;

SearchBox.defaultProps = {
  className: '',
};
