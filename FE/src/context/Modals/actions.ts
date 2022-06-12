import { useContext } from 'react';

import { ModalDispatchContext } from '@/context/Modals';

const { open, close } = useContext(ModalDispatchContext);

export const openModal = (key: string) => {
  open(key);
};

export const closeModal = (key: string) => {
  close(key);
};
