import { useState } from 'react';

import Chart from '@/components/Chart';
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

  const [minXThumb, setMinXThumb] = useState(0);
  const [maxXThumb, setMaxXThumb] = useState(maximumX);

  // FIXME: handleMaxPriceChange와 handleMinPriceChange 내부 로직이 비슷한 흐름인데 중복을 줄일 수 없을까?
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const newValue = Number(value);
    if (newValue <= minXThumb) {
      setMinXThumb(newValue - xStep);
    }
    setMaxXThumb(newValue);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const newValue = Number(value);
    if (newValue >= maxXThumb) {
      setMaxXThumb(newValue + xStep);
    }
    setMinXThumb(newValue);
  };

  const leftIndex = xDataset.findIndex(element => element === minXThumb);
  const leftY = yDataset[leftIndex];

  const revisedRigthX = getRevisedX(maxXThumb, maximumX, CANVAS_WIDTH);
  const revisedLeftX = getRevisedX(minXThumb, maximumX, CANVAS_WIDTH);
  const revisedLeftY = getRevisedY(leftY, maximumY, CANVAS_HEIGHT);

  return (
    <S.CanvasContainer>
      <Chart
        xDataset={xDataset}
        yDataset={yDataset}
        maximumX={maximumX}
        maximumY={maximumY}
        minXThumb={minXThumb}
        maxXThumb={maxXThumb}
        size={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        revisedValues={{ revisedRigthX, revisedLeftX, revisedLeftY }}
      />
      <label>최소</label>
      <input
        type="range"
        value={minXThumb}
        step={xStep}
        min={0}
        max={maximumX}
        onChange={handleMinPriceChange}
      />
      <br />
      <label>최대</label>
      <input
        type="range"
        value={maxXThumb}
        step={xStep}
        min={0}
        max={maximumX}
        onChange={handleMaxPriceChange}
      />
    </S.CanvasContainer>
  );
}

const getRevisedX = (rawX: number, currentMaximumX: number, width: number): number =>
  (rawX / currentMaximumX) * width;

const getRevisedY = (rawY: number, currentMaximumY: number, height: number): number =>
  height - (rawY / currentMaximumY) * height;
