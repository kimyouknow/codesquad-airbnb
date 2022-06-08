import * as S from './style';

interface MultiRangerSliderProps {
  leftThumbX: number;
  rightThumbX: number;
  setLeftThumbX: (param: number) => void;
  setRightThumbX: (param: number) => void;
  xStep: number;
  maximumX: number;
}

export default function MultiRangerSlider({
  leftThumbX,
  rightThumbX,
  setLeftThumbX,
  setRightThumbX,
  xStep,
  maximumX,
}: MultiRangerSliderProps) {
  // FIXME: handleMaxPriceChange와 handleMinPriceChange 내부 로직이 비슷한 흐름인데 중복을 줄일 수 없을까?
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const newValue = Number(value);
    if (newValue <= leftThumbX) {
      setLeftThumbX(newValue - xStep);
    }
    setRightThumbX(newValue);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const newValue = Number(value);
    if (newValue >= rightThumbX) {
      setRightThumbX(newValue + xStep);
    }
    setLeftThumbX(newValue);
  };

  const moveLeftThumbX = (leftThumbX / maximumX) * 100;
  const moveRightThumbX = 100 - (rightThumbX / maximumX) * 100;

  return (
    <S.Container>
      <S.InputRange
        type="range"
        value={leftThumbX}
        step={xStep}
        min={0}
        max={maximumX}
        onChange={handleMinPriceChange}
      />
      <S.InputRange
        type="range"
        value={rightThumbX}
        step={xStep}
        min={0}
        max={maximumX}
        onChange={handleMaxPriceChange}
      />
      <S.ActiveRange moveLeftThumbX={moveLeftThumbX} moveRightThumbX={moveRightThumbX} />
    </S.Container>
  );
}
