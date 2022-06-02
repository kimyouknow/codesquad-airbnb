import { useEffect, useRef, useState } from 'react';

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

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.beginPath();
    context.strokeStyle = 'rgba(0, 0, 0, 0)';
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
    context.beginPath();

    context.strokeStyle = 'tomato';
    context.lineWidth = 4;

    const newXDataset = xDataset.filter(x => x <= rigthX);
    setPositions(context, newXDataset, yDataset, maximumX, maximumY);
    context.stroke();

    // TODO: 바뀐 값에 따라 라인이 업데이트되면 이후에 색칠로직 구현하기
    // const xRatio = caculateXRatio(rigthX, maximumX);
    // fillContext(context, leftX, rigthX, 'tomato');
  };

  useEffect(() => {
    renderCanvas();
  }, []);

  useEffect(() => {
    drawBackgroundChart();
    drawAciveChart(minXThumb, maxXThumb);
  }, [minXThumb, maxXThumb]);

  return (
    <S.CanvasContainer>
      <S.Canvas ref={canvasRef}></S.Canvas>
      <input
        type="range"
        value={maxXThumb}
        step={10_000} // FIXME: 간격 계산해서 매직넘버 없애기
        min={0}
        max={maximumX}
        onChange={handleMaxPriceChange}
      />
    </S.CanvasContainer>
  );
}

const caculateXRatio = (rawX: number, maximumX: number): number => (rawX / maximumX) * CANVAS_WIDTH;

const caculateYRatio = (rawY: number, maximumY: number): number =>
  CANVAS_HEIGHT - (rawY / maximumY) * CANVAS_HEIGHT;

const setPositions = (
  context: CanvasRenderingContext2D,
  xDataset: number[],
  yDataset: number[],
  maximumX: number,
  maximumY: number,
) => {
  context.moveTo(START_X, CANVAS_HEIGHT);
  xDataset.forEach((rawX, index) => {
    const rawY = yDataset[index];
    const x = caculateXRatio(rawX, maximumX);
    const y = caculateYRatio(rawY, maximumY);
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
