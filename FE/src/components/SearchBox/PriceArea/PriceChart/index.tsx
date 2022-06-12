import { useState } from 'react';

import Chart from '@/components/SearchBox/PriceArea/PriceChart/Chart';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/components/SearchBox/PriceArea/PriceChart/constants';
import MultiRangerSlider from '@/components/SearchBox/PriceArea/PriceChart/MultiRangerSlider';
import PriceInfo from '@/components/SearchBox/PriceArea/PriceChart/PriceInfo';
import { PriceChartDataProps } from '@/data/chartData';

import * as S from './style';

interface PriceChartProps {
  chartInfo: PriceChartDataProps[];
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
    selectablePriceDataset.reduce((a, b) => a + b, 0) / selectablePriceDataset.length;

  return (
    <S.Container>
      <PriceInfo
        minimunX={minimunX}
        maximumX={maximumX}
        selectablePriceAverage={selectablePriceAverage}
      />
      <S.ChartContainer>
        <Chart
          xDataset={xDataset}
          yDataset={yDataset}
          size={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
          hasSlider
          leftThumbX={leftThumbX}
          rightThumbX={rightThumbX}
        />
        <MultiRangerSlider
          style={{ width: CANVAS_WIDTH }}
          step={xStep}
          max={maximumX}
          min={0}
          leftValue={leftThumbX}
          rightValue={rightThumbX}
          leftOnChange={handleMinPriceChange}
          rightOnChange={handleMaxPriceChange}
        />
      </S.ChartContainer>
    </S.Container>
  );
}
