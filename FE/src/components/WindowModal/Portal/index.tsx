import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}

function Potal({ children }: Props) {
  useEffect(() => {
    // 화면 스크롤 방지
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      // 스크롤 방지 해제
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: "";  top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const rootElement: Element | DocumentFragment | null = document.getElementById('modal');
  return rootElement && createPortal(children, rootElement); //Todo : null일때 모달 실행 안되도록 에러처리
}

export default Potal;
