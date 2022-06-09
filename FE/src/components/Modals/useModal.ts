import { useContext } from 'react';

import { ModalDispatchContext } from '@/components/Modals/Context';

export default function useModal(key: string) {
  const { open, close } = useContext(ModalDispatchContext);
  const openModal = () => {
    open(key);
  };
  const closeModal = () => {
    close(key);
  };
  return [openModal, closeModal];
}
