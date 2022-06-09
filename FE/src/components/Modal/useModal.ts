import { useContext } from 'react';

import { ModalDispatchContext } from '@/components/Modal/Context';
import { ModalStateType } from '@/components/Modal/types';

export default function useModal() {
  const { open, close } = useContext(ModalDispatchContext);
  const openModal = ({ Component, key }: ModalStateType) => {
    open({ Component, key });
  };
  const closeModal = (key: string) => {
    close(key);
  };
  return [openModal, closeModal];
}
