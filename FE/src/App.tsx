import CalendarModal from '@/components/CalendarModal';
import CanvasLineChart from '@/components/CanvasLineCharts';
import PriceChart from '@/components/PriceChart';
import SVGLineChart from '@/components/SVGLineChart';
import useToggle from '@/hooks/useToggle';

function App() {
  const [isModalOpen, handleOpenModal] = useToggle(false);
  return (
    <>
      <div>
        <button onClick={handleOpenModal}>캘린더 모달</button>
        <CalendarModal isModalOpen={isModalOpen} handleOpenModal={handleOpenModal} />
        <PriceChart />
      </div>
    </>
  );
}

export default App;
