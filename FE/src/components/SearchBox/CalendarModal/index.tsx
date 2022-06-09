import Modal from '@/components/Modal';
import CalendarCaoursel from '@/components/SearchBox/CalendarModal/CalendarCourousel';

interface CalendarModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function CalendarModal({ isModalOpen, handleOpenModal }: CalendarModalProps) {
  return (
    <Modal wrapperId="calendar" isOpen={isModalOpen} onClose={handleOpenModal}>
      <CalendarCaoursel initDate={new Date()} itemGap={26} showingCardNum={2} hiddenCardNum={2} />
    </Modal>
  );
}
