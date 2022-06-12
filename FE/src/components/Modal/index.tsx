import { ReactNode } from 'react';
import { CSSProp } from 'styled-components';

import Potal from '@/components/Modal/Potal';

import * as S from './style';

export interface ModalProps {
  wrapperId: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  customStyle?: {
    overlay: CSSProp | null | undefined;
    content: CSSProp | null | undefined;
    button: CSSProp | null | undefined;
  };
}

export default function Modal({ wrapperId, isOpen, onClose, children, customStyle }: ModalProps) {
  const { overlay, content, button } = S.defaultStyle;
  const customOverlayStyle = customStyle?.overlay || overlay;
  const customContentStyle = customStyle?.content || content;
  const customButtonStyle = customStyle?.button || button;
  if (!isOpen) return null;
  return (
    <Potal wrapperId={wrapperId}>
      <S.Overlay onClick={onClose} customStyle={customOverlayStyle}>
        <S.Content onClick={event => event.stopPropagation()} customStyle={customContentStyle}>
          <S.CloseButton onClick={onClose} customStyle={customButtonStyle}>
            &times;
          </S.CloseButton>
          {children}
        </S.Content>
      </S.Overlay>
    </Potal>
  );
}
