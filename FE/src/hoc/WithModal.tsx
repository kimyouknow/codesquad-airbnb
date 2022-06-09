import Modal, { ModalProps } from '@/components/Modal';

export default function WithModal({ wrapperId, isOpen, onClose, children }: ModalProps) {
  return (
    <Modal wrapperId={wrapperId} isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
}
