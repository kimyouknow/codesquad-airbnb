import { ReactNode } from 'react';

import Potal from '@/components/Modals/Potal';

import * as S from './style';

interface ModalProps {
  isOpen: boolean;
  parent?: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ isOpen, parent, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <Potal parent={parent}>
      <S.Overlay onClick={onClose}>
        <S.Content onClick={event => event.stopPropagation()}>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
          {children}
        </S.Content>
      </S.Overlay>
    </Potal>
  );
}
