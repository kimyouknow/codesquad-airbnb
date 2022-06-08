import { useState } from 'react';

import Chart from '@/components/PriceChart/Chart';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/components/PriceChart/constants';
import MultiRangerSlider from '@/components/PriceChart/MultiRangerSlider';
import PriceInfo from '@/components/PriceChart/PriceInfo';

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
  const minimunX = Math.min(...xDataset);
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
  // FIXME: react에서 Array.prototype.customMehtod 같은 체이닝을 어떻게 선언할까?
  const selectablePriceDataset = xDataset.filter(x => leftThumbX <= x && x <= rightThumbX);
  const selectablePriceAverage =
    selectablePriceDataset.reduce((a, b) => a + b) / selectablePriceDataset.length;

  return (
    <S.Container containerWidth={CANVAS_HEIGHT} containerHeight={CANVAS_WIDTH}>
      <PriceInfo
        minimunX={minimunX}
        maximumX={maximumX}
        selectablePriceAverage={selectablePriceAverage}
      />
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
