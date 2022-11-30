import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

const useWindowWidth = () => {
  const hasMounted = useHasMounted();
  const [width, setWidth] = useState(0);

  const handleResize = useCallback(() => {
    if (!hasMounted) return;
    setWidth(window.innerWidth);
  }, [hasMounted]);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted) {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
    return () => {};
  }, [hasMounted, handleResize]);

  return width;
};

export default useWindowWidth;
