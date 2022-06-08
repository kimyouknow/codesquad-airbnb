import CalendarModal from '@/components/CalendarModal';
import PriceChartModal from '@/components/PriceChartModal';
import useToggle from '@/hooks/useToggle';

export default function App() {
  const [isCalendarModalOpen, handleCalendarModalOpen] = useToggle(false);
  const [isPriceChartModalOpen, handlePriceChartModalOpen] = useToggle(false);

  return (
    <div>
      <button onClick={handleCalendarModalOpen}>캘린더 모달</button>
      <button onClick={handlePriceChartModalOpen}>차트 모달</button>
      <CalendarModal isModalOpen={isCalendarModalOpen} handleOpenModal={handleCalendarModalOpen} />
      <PriceChartModal
        isModalOpen={isPriceChartModalOpen}
        handleOpenModal={handlePriceChartModalOpen}
      />
    </div>
  );
}
