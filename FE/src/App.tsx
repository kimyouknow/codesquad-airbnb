import LoginModal from '@/components/LoginModal';
import useToggle from '@/hooks/useToggle';

function App() {
  const [isModalOpen, handleOpenModal] = useToggle(false);
  return (
    <div>
      <button onClick={handleOpenModal}>로그인 모달</button>
      <LoginModal isModalOpen={isModalOpen} handleOpenModal={handleOpenModal} />
    </div>
  );
}

export default App;
