import CalendarCaoursel from '@/components/CalendarModal/CalendarCourousel';
import Modal from '@/components/Modals/Modal';

interface CalendarModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function CalendarModal({ isModalOpen, handleOpenModal }: CalendarModalProps) {
  return (
    <Modal isOpen={isModalOpen} onClose={handleOpenModal}>
      <CalendarCaoursel initDate={new Date()} itemGap={26} showingCardNum={2} hiddenCardNum={2} />
    </Modal>
  );
}
