import Modal, { ModalProps } from '@/components/Modal';

export default function WithModal({
  wrapperId,
  isOpen,
  onClose,
  children,
  customStyle,
}: ModalProps) {
  return (
    <Modal wrapperId={wrapperId} isOpen={isOpen} onClose={onClose} customStyle={customStyle}>
      {children}
    </Modal>
  );
}
