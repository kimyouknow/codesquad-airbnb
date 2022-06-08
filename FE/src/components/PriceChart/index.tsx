import { useState } from 'react';

import Chart from '@/components/PriceChart/Chart';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/components/PriceChart/constants';
import MultiRangerSlider from '@/components/PriceChart/MultiRangerSlider';

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
      <MultiRangerSlider
        step={xStep}
        max={maximumX}
        min={0}
        leftValue={leftThumbX}
        rightValue={rightThumbX}
        leftOnChange={handleMinPriceChange}
        rightOnChange={handleMaxPriceChange}
      />
    </S.Container>
  );
}
