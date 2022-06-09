import { createPortal } from 'react-dom';

import { PortalProps } from '@/components/Modal/types';
import useScrollLock from '@/hooks/useScrollLock';

export default function Potal({ parent, children }: PortalProps) {
  useScrollLock(true); // TODO: advanced 버전으로 변경해보기

  const potalContainer = parent || getRootElementById('modal');

  return createPortal(children, potalContainer as HTMLElement);
}

const getRootElementById = (documentId: string) => {
  let rootElement = document.getElementById(documentId);

  if (!rootElement) {
    rootElement = createWrapperAndAppendToBody(documentId);
  }
  return rootElement;
};

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};
