import Calendar from '@/components/Calendar';

import WindowModal from '../WindowModal';

interface Props {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function CalendarModal({ isModalOpen, handleOpenModal }: Props) {
  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      <div>Calendar</div>
      <Calendar />
    </WindowModal>
  );
}
