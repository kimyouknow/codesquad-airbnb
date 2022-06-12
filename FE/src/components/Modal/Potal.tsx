import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useScrollLock from '@/hooks/useScrollLock';

// TODO: 일단 가장 넓은 범위의 ReactNode 타입 사용 (추가 공부 필요)
export interface PortalProps {
  children: ReactNode;
  wrapperId: string;
}

export default function Potal({ children, wrapperId }: PortalProps) {
  const [potalWrapper, setPotalWrapper] = useState<HTMLElement | null>(null);
  useScrollLock(true); // TODO: advanced 버전으로 변경해보기

  useLayoutEffect(() => {
    const { isCreated, wrapper } = getRootElementById(wrapperId);
    setPotalWrapper(wrapper);
    return () => {
      if (isCreated) {
        removeElement(wrapper);
      }
    };
  }, [wrapperId]);

  if (!potalWrapper) return null;

  return createPortal(children, potalWrapper);
}

const removeElement = (wrapper: HTMLElement) => {
  wrapper.parentNode?.removeChild(wrapper);
};

const getRootElementById = (documentId: string) => {
  let wrapper = document.getElementById(documentId);
  let isCreated = false;
  if (!wrapper) {
    wrapper = createWrapperAndAppendToBody(documentId);
    isCreated = true;
  }
  return { isCreated, wrapper };
};

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};
