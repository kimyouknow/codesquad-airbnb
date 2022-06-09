import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import useScrollLock from '@/hooks/useScrollLock';

// TODO: 일단 가장 넓은 범위의 ReactNode 타입 사용 (추가 공부 필요)
export interface PortalProps {
  parent: ReactNode | null | undefined;
  children: ReactNode;
}

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
