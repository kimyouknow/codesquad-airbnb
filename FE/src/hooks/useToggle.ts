import { useState, Dispatch, SetStateAction } from 'react';

type UseToggleReturnProps = [boolean, () => void, Dispatch<SetStateAction<boolean>>];

const useToggle = (initialMode: boolean): UseToggleReturnProps => {
  const [isToggleOn, setIsToggleOn] = useState(initialMode);
  const handleToggle = () => setIsToggleOn(prev => !prev);
  return [isToggleOn, handleToggle, setIsToggleOn];
};

export default useToggle;
