import { createContext, ReactNode, useMemo, useState } from 'react';

interface ModalProviderProps {
  children: ReactNode;
}

export interface ModalStateType {
  Component: ReactNode;
  key: string;
}

export interface ModalDispatchActionType {
  open: (key: string) => void;
  close: (key: string) => void;
}

export const ModalStateContext = createContext<string[] | null>(null);

export const ModalDispatchContext = createContext<ModalDispatchActionType>({
  open: () => {},
  close: () => {},
});

export default function ModalProvider({ children }: ModalProviderProps) {
  const [openModals, setOpenModals] = useState<string[]>([]);

  const open = (key: string) => {
    setOpenModals(modals => [...modals, key]);
  };

  const close = (key: string) => {
    setOpenModals(modals => {
      return modals.filter(modal => modal === key);
    });
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalStateContext.Provider value={openModals}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
