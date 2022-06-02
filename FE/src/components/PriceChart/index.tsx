import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/components/PriceChart/constants';

import * as S from './style';

interface RoomCapacityType {
  [index: string]: number;
  range: number;
  count: number;
}

interface PriceChartProps {
  chartInfo: RoomCapacityType[];
  axis: { x: string; y: string };
}

const START_X = 0;

export default function PriceChart({ chartInfo, axis }: PriceChartProps) {
  const xDataset = chartInfo.map(element => element[axis.x]);
  const yDataset = chartInfo.map(element => element[axis.y]);
  const maximumX = Math.max(...xDataset);
  const maximumY = Math.max(...yDataset);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [minXThumb, setMinXThumb] = useState(0);
  const [maxXThumb, setMaxXThumb] = useState(maximumX);

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMaxXThumb(Number(value));
  };

  const renderCanvas = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  };

  const drawBackgroundChart = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.beginPath();
    context.moveTo(START_X, CANVAS_HEIGHT); // 시작점(좌하단)으로 이동

    setPositions(context, xDataset, yDataset, maximumX, maximumY);

    context.stroke();
    fillContext(context, 0, CANVAS_WIDTH, 'wheat');
  };

  const drawAciveChart = (leftX: number, rigthX: number) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.strokeStyle = 'darkGreen';
    context.lineWidth = 4;

    const newChartInfo = chartInfo.filter(({ range }) => range < rigthX);
    console.log('newChartInfo :>> ', newChartInfo, rigthX);
    // setPositions(context, newChartInfo, maxRange, maxCount);
    // context.stroke();

    // fillContext(context, leftX, rigthX, 'tomato');
  };

  useLayoutEffect(() => {
    renderCanvas();
    drawBackgroundChart();
  }, []);

  useEffect(() => {
    drawAciveChart(minXThumb, maxXThumb);
  }, [minXThumb, maxXThumb]);

  return (
    <S.CanvasContainer>
      <S.Canvas ref={canvasRef}></S.Canvas>
      <input
        type="range"
        value={maxXThumb}
        step={10}
        min={0}
        max={maximumX}
        onChange={handleMaxPriceChange}
      />
    </S.CanvasContainer>
  );
}

const setPositions = (
  context: CanvasRenderingContext2D,
  xDataset: number[],
  yDataset: number[],
  maximumX: number,
  maximumY: number,
) => {
  xDataset.forEach((rawX, index) => {
    const rawY = yDataset[index];
    const x = (rawX / maximumX) * CANVAS_WIDTH;
    const y = CANVAS_HEIGHT - (rawY / maximumY) * CANVAS_HEIGHT;
    context.lineTo(x, y);
  });
};

const fillContext = (
  context: CanvasRenderingContext2D,
  leftXPosition: number,
  rigthXPosition: number,
  bgColor: string,
) => {
  context.lineTo(rigthXPosition, CANVAS_HEIGHT); // 좌표 맨 오른쪽 끝
  context.lineTo(leftXPosition, CANVAS_HEIGHT); // 좌표 시작으로 다시 가기
  context.fillStyle = bgColor;
  context.fill();
};
