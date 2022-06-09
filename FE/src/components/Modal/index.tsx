import Potal from '@/components/Modal/Potal';
import { PortalProps } from '@/components/Modal/types';
import useModal from '@/components/Modal/useModal';

import * as S from './style';

export default function Modal({ parent, children }: PortalProps) {
  const [openModal, closeModal] = useModal();
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
