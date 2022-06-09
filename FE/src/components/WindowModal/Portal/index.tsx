import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import useScrollLock from '@/hooks/useScrollLock';

interface PortalProps {
  children: ReactNode;
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

function Potal({ children }: PortalProps) {
  useScrollLock(true);

  let rootElement = document.getElementById('modal');

  if (!rootElement) {
    rootElement = createWrapperAndAppendToBody('modal');
  }

  return rootElement && createPortal(children, rootElement);
}

export default Potal;
