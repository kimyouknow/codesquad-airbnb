import { ReactNode } from 'react';

import Potal from './Portal';
import * as S from './style';

interface Props {
  children: ReactNode;
  show: boolean;
  handleOpenModal: () => void;
}

function WindowModal({ children, show, handleOpenModal }: Props) {
  if (!show) {
    return null;
  }
  return (
    <Potal>
      <S.ModalWrapper onClick={handleOpenModal}>
        <S.ModalContainer onClick={(event: Event) => event.stopPropagation()}>
          <S.CloseModalButton onClick={handleOpenModal}>&times;</S.CloseModalButton>
          {children}
        </S.ModalContainer>
      </S.ModalWrapper>
    </Potal>
  );
}

export default WindowModal;
