/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import WindowModal from '../WindowModal';

export default function LoginModal({ isModalOpen, handleOpenModal }) {
  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      <button type="button">msw 임시 로그인 버튼</button>
    </WindowModal>
  );
}
