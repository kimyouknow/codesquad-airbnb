import CalendarCaoursel from '@/components/CalendarCourousel';

import WindowModal from '../WindowModal';

interface CalendarModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function CalendarModal({ isModalOpen, handleOpenModal }: CalendarModalProps) {
  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      <CalendarCaoursel initDate={new Date()} itemGap={26} showingCardNum={2} hiddenCardNum={2} />
    </WindowModal>
  );
}
