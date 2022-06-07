import CalendarCaoursel from '@/components/CalendarCourousel';

import WindowModal from '../WindowModal';

interface CalendarModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function CalendarModal({ isModalOpen, handleOpenModal }: CalendarModalProps) {
  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      <CalendarCaoursel />
    </WindowModal>
  );
}
