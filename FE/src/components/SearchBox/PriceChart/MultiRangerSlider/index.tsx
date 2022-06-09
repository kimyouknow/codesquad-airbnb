import * as S from './style';

interface MultiRangerSliderProps {
  style: { width: number };
  step: number;
  max: number;
  min: number;
  leftValue: number;
  rightValue: number;
  leftOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rightOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MultiRangerSlider({
  style,
  step,
  max,
  min,
  leftValue,
  rightValue,
  leftOnChange,
  rightOnChange,
}: MultiRangerSliderProps) {
  const moveLeftThumbX = (leftValue / max) * 100;
  const moveRightThumbX = 100 - (rightValue / max) * 100;
  return (
    <S.Container width={style.width}>
      <S.InputRange
        type="range"
        value={leftValue}
        step={step}
        min={min}
        max={max - step}
        onChange={leftOnChange}
        isLeftThumb
      />
      <S.InputRange
        type="range"
        value={rightValue}
        step={step}
        min={min + step}
        max={max}
        onChange={rightOnChange}
        isLeftThumb={false}
      />
      <S.ActiveRange moveLeftThumbX={moveLeftThumbX} moveRightThumbX={moveRightThumbX} />
    </S.Container>
  );
}
