import CalendarModal from '@/components/CalendarModal';
import useToggle from '@/hooks/useToggle';

function App() {
  const [isModalOpen, handleOpenModal] = useToggle(false);
  return (
    <>
      <div>
        <button onClick={handleOpenModal}>캘린더 모달</button>
        <CalendarModal isModalOpen={isModalOpen} handleOpenModal={handleOpenModal} />
      </div>
    </>
  );
}

export default App;
