import { useEffect, useRef } from 'react';

export interface ChartProps {
  xDataset: number[];
  yDataset: number[];
  maximumX: number;
  maximumY: number;
  minXThumb: number;
  maxXThumb: number;
  size: {
    width: number;
    height: number;
  };
}

const START_X = 0;

export default function Chart({
  xDataset,
  yDataset,
  maximumX,
  maximumY,
  minXThumb,
  maxXThumb,
  size,
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = size;
  const renderCanvas = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
  };

  const drawBackgroundChart = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.strokeStyle = 'rgba(0, 0, 0, 0)';

    context.moveTo(START_X, height);
    setPositions(context, xDataset, yDataset, maximumX, maximumY, width, height);

    context.stroke();
    fillContext(context, height, 0, width, 'wheat');
  };

  const drawAciveChart = (leftX: number, rigthX: number) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.beginPath();

    const leftIndex = xDataset.findIndex(element => element === leftX);
    const leftY = yDataset[leftIndex];

    const newXDataset = xDataset.filter(x => leftX <= x && x <= rigthX);
    const newYDataset = yDataset.filter((_, index) => index >= leftIndex);

    const revisedRigthX = getRevisedX(rigthX, maximumX, width);
    const revisedLeftX = getRevisedX(leftX, maximumX, width);
    const revisedLeftY = getRevisedY(leftY, maximumY, height);

    context.moveTo(revisedLeftX, revisedLeftY);
    setPositions(context, newXDataset, newYDataset, maximumX, maximumY, width, height);
    context.stroke();

    fillContext(context, height, revisedLeftX, revisedRigthX, 'tomato');
  };

  useEffect(() => {
    renderCanvas();
  }, []);

  useEffect(() => {
    drawBackgroundChart();
    drawAciveChart(minXThumb, maxXThumb);
  }, [minXThumb, maxXThumb]);

  return <canvas ref={canvasRef}></canvas>;
}

const getRevisedX = (rawX: number, maximumX: number, width: number): number =>
  (rawX / maximumX) * width;

const getRevisedY = (rawY: number, maximumY: number, height: number): number =>
  height - (rawY / maximumY) * height;

const setPositions = (
  context: CanvasRenderingContext2D,
  xDataset: number[],
  yDataset: number[],
  maximumX: number,
  maximumY: number,
  width: number,
  height: number,
) => {
  xDataset.forEach((rawX, index) => {
    const rawY = yDataset[index];
    const x = getRevisedX(rawX, maximumX, width);
    const y = getRevisedY(rawY, maximumY, height);
    context.lineTo(x, y);
  });
};

const fillContext = (
  context: CanvasRenderingContext2D,
  height: number,
  leftXPosition: number,
  rigthXPosition: number,
  bgColor: string,
) => {
  context.lineTo(rigthXPosition, height); // 좌표 맨 오른쪽 끝
  context.lineTo(leftXPosition, height); // 좌표 시작으로 다시 가기
  context.fillStyle = bgColor;
  context.fill();
};
