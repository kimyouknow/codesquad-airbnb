import { ReactNode } from 'react';

// TODO: 일단 가장 넓은 범위의 ReactNode 타입 사용 (추가 공부 필요)
export interface PortalProps {
  parent: ReactNode | null | undefined;
  children: ReactNode;
}

export interface ModalProps {
  children: ReactNode;
}

export interface ModalStateType {
  Component: ReactNode;
  key: string;
}

export interface ModalDispatchActionType {
  open: (Component: ModalStateType) => void;
  close: (key: string) => void;
}
