import { useState } from 'react';

import Chart from '@/components/Chart';
import { calculateXRatio, calculateYRatio } from '@/components/Chart/util';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/components/PriceChart/constants';

import * as S from './style';

interface RoomCapacityType {
  [index: string]: number;
  range: number;
  count: number;
}

interface PriceChartProps {
  chartInfo: RoomCapacityType[];
  axis: { x: string; y: string };
  xStep: number;
  yStep: number;
}

export default function PriceChart({ chartInfo, axis, xStep, yStep }: PriceChartProps) {
  const xDataset = chartInfo.map(element => element[axis.x]);
  const yDataset = chartInfo.map(element => element[axis.y]);
  const maximumX = Math.max(...xDataset);
  const maximumY = Math.max(...yDataset);

  const [leftThumbX, setLeftThumbX] = useState(0);
  const [rightThumbX, setRightThumbX] = useState(maximumX);

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
    <S.Container containerWidth={CANVAS_HEIGHT} containerHeight={CANVAS_WIDTH}>
      <Chart
        xDataset={xDataset}
        yDataset={yDataset}
        size={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        hasSlider
        leftThumbX={leftThumbX}
        rightThumbX={rightThumbX}
      />
      <S.SliderController
        type="range"
        value={leftThumbX}
        step={xStep}
        min={0}
        max={maximumX}
        onChange={handleMinPriceChange}
      />
      <S.SliderController
        type="range"
        value={rightThumbX}
        step={xStep}
        min={0}
        max={maximumX}
        onChange={handleMaxPriceChange}
      />
      <S.VirtualSlider>
        <S.Track></S.Track>
        <S.Range moveLeftThumbX={moveLeftThumbX} moveRightThumbX={moveRightThumbX}></S.Range>
        <S.LeftThumb moveLeftThumbX={moveLeftThumbX}></S.LeftThumb>
        <S.RightThumb moveRightThumbX={moveRightThumbX}></S.RightThumb>
      </S.VirtualSlider>
    </S.Container>
  );
}
