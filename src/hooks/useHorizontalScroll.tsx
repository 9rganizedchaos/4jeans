import { useEffect, useRef } from 'react';

const useHorizontalScroll = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY === 0) return;

      e.preventDefault();
      scrollArea.scrollTo({
        left: scrollArea.scrollLeft + e.deltaY,
        behavior: 'smooth',
      });
    };

    scrollArea.addEventListener('wheel', handleScroll);
    // eslint-disable-next-line consistent-return
    return () => scrollArea.removeEventListener('wheel', handleScroll);
  }, []);

  return scrollAreaRef;
};

export default useHorizontalScroll;
