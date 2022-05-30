import CalendarModal from '@/components/CalendarModal';
import CanvasLineChart from '@/components/CanvasLineCharts';
import SVGLineChart from '@/components/SVGLineChart';
import useToggle from '@/hooks/useToggle';

function App() {
  const [isModalOpen, handleOpenModal] = useToggle(false);
  return (
    <>
      <div>
        <button onClick={handleOpenModal}>캘린더 모달</button>
        <CalendarModal isModalOpen={isModalOpen} handleOpenModal={handleOpenModal} />
        <SVGLineChart />
        <CanvasLineChart />
      </div>
    </>
  );
}

export default App;
