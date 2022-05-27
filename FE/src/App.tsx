import CanvasLineChart from '@/components/CanvasLineCharts';
import LoginModal from '@/components/LoginModal';
import SVGLineChart from '@/components/SVGLineChart';
import useToggle from '@/hooks/useToggle';

function App() {
  const [isModalOpen, handleOpenModal] = useToggle(false);
  return (
    <div>
      <button onClick={handleOpenModal}>로그인 모달</button>
      <LoginModal isModalOpen={isModalOpen} handleOpenModal={handleOpenModal} />
      <SVGLineChart />
      <CanvasLineChart />
    </div>
  );
}

export default App;
