import { useEffect, useRef } from 'react';

export interface ChartProps {
  xDataset: number[];
  yDataset: number[];
  maximumX: number;
  maximumY: number;
  leftThumbX: number;
  rightThumbX: number;
  size: {
    width: number;
    height: number;
  };
  revisedValues: {
    revisedRigthX: number;
    revisedLeftX: number;
    revisedLeftY: number;
  };
}

const START_X = 0;

export default function Chart({
  xDataset,
  yDataset,
  maximumX,
  maximumY,
  leftThumbX,
  rightThumbX,
  size,
  revisedValues,
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = size;
  const { revisedRigthX, revisedLeftX, revisedLeftY } = revisedValues;

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

    const newXDataset = xDataset.filter(x => leftX <= x && x <= rigthX);
    const newYDataset = yDataset.filter((_, index) => index >= leftIndex);

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
    drawAciveChart(leftThumbX, rightThumbX);
  }, [leftThumbX, rightThumbX]);

  return <canvas ref={canvasRef}></canvas>;
}

const calculateXRatio = (rawX: number, maximumX: number, width: number): number =>
  (rawX / maximumX) * width;

const calculateYRatio = (rawY: number, maximumY: number, height: number): number =>
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
    const x = calculateXRatio(rawX, maximumX, width);
    const y = calculateYRatio(rawY, maximumY, height);
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
