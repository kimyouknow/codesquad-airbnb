import { createContext, useMemo, useState } from 'react';

import { ModalDispatchActionType, ModalProps, ModalStateType } from '@/components/Modal/types';

export const ModalStateContext = createContext<ModalStateType[] | null>(null);

export const ModalDispatchContext = createContext<ModalDispatchActionType>({
  open: () => {},
  close: () => {},
});

export default function ModalProvider({ children }: ModalProps) {
  const [openModals, setOpenModals] = useState<ModalStateType[]>([]);

  const open = ({ Component, key }: ModalStateType) => {
    setOpenModals(modals => [...modals, { Component, key }]);
  };

  const close = (key: string) => {
    setOpenModals(modals => {
      return modals.filter(modal => modal.key === key);
    });
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalStateContext.Provider value={openModals}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
