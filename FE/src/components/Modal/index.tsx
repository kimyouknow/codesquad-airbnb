import { ReactNode } from 'react';

import Potal from '@/components/Modal/Potal';

import * as S from './style';

export interface ModalProps {
  wrapperId: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ wrapperId, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <Potal wrapperId={wrapperId}>
      <S.Overlay onClick={onClose}>
        <S.Content onClick={event => event.stopPropagation()}>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
          {children}
        </S.Content>
      </S.Overlay>
    </Potal>
  );
}
