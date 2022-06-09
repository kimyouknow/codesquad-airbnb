import { useEffect } from 'react';

const useScrollLock = (isLock: boolean) => {
  useEffect(() => {
    if (!isLock) return;

    // 화면 스크롤 방지
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      // 스크롤 방지 해제
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: "";  top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);
};

export default useScrollLock;
