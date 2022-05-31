import { useState } from 'react';

import Calendar from '@/components/Calendar';

import WindowModal from '../WindowModal';

interface CalendarModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function CalendarModal({ isModalOpen, handleOpenModal }: CalendarModalProps) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const [activeYear, setActiveYear] = useState(year);
  const [activeMonth, setActiveMonth] = useState(month);
  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Calendar activeMonth={activeMonth - 1} activeYear={activeYear} />
        <Calendar activeMonth={activeMonth} activeYear={activeYear} />
        <Calendar activeMonth={activeMonth + 1} activeYear={activeYear} />
        <Calendar activeMonth={activeMonth + 2} activeYear={activeYear} />
      </div>
    </WindowModal>
  );
}
