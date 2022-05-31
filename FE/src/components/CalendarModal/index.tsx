import Calendar from '@/components/Calendar';

import WindowModal from '../WindowModal';

interface CalendarModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function CalendarModal({ isModalOpen, handleOpenModal }: CalendarModalProps) {
  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      <div>Calendar</div>
      <Calendar />
    </WindowModal>
  );
}
