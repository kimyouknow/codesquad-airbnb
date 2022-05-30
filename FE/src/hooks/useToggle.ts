import { useState, Dispatch, SetStateAction } from 'react';

type ReturnProps = [boolean, () => void, Dispatch<SetStateAction<boolean>>];

const useToggle = (initialMode: boolean): ReturnProps => {
  const [isToggleOn, setIsToggleOn] = useState(initialMode);
  const handleToggle = () => setIsToggleOn(prev => !prev);
  return [isToggleOn, handleToggle, setIsToggleOn];
};

export default useToggle;
