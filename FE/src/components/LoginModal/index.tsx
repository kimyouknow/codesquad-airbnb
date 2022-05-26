import WindowModal from '../WindowModal';

interface Props {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function LoginModal({ isModalOpen, handleOpenModal }: Props) {
  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      <button type="button">msw 임시 로그인 버튼</button>
    </WindowModal>
  );
}
