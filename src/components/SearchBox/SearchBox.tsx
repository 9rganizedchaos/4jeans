import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Search, X } from 'react-feather';
import styles from './SearchBox.module.scss';

interface SearchBoxProps {
  placeholder: string;
  handleEnterPress: () => void;
}

function SearchBox({ placeholder, handleEnterPress }: SearchBoxProps) {
  const [input, setInput] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCancelBtnClick = () => {
    setInput('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleEnterPress();
    }
  };

  return (
    <div className={styles['search-box-wrapper']}>
      <Search className={styles['search-icon']} />
      <input value={input} placeholder={placeholder} onChange={handleInputChange} onKeyDown={handleKeyPress} />
      <button type="button" className={styles['cancel-btn']} onClick={handleCancelBtnClick}>
        <X />
      </button>
    </div>
  );
}

export default SearchBox;
