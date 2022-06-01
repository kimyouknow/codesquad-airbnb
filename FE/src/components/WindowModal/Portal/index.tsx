import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

// 출처 : https://blog.logrocket.com/build-modal-with-react-portals/
function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);

  return wrapperElement;
}

function Potal({ children }: PortalProps) {
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

  let rootElement = document.getElementById('modal');

  if (!rootElement) {
    rootElement = createWrapperAndAppendToBody('modal');
  }

  return rootElement && createPortal(children, rootElement);
}

export default Potal;
