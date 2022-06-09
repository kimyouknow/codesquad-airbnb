import { ReactNode } from 'react';

import Potal from '@/components/Modal/Potal';

import * as S from './style';

interface ModalProps {
  parent: ReactNode | null | undefined;
  children: ReactNode;
}

export default function Modal({ parent, children }: ModalProps) {
  const onClose = () => {};
  return (
    <Potal parent={parent}>
      <S.ModalWrapper onClick={onClose}>
        <S.ModalContainer onClick={event => event.stopPropagation()}>
          <S.CloseModalButton onClick={onClose}>&times;</S.CloseModalButton>
          {children}
        </S.ModalContainer>
      </S.ModalWrapper>
    </Potal>
  );
}
