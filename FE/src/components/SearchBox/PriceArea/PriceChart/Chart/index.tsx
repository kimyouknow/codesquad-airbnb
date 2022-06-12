import { useEffect, useRef } from 'react';

import {
  calculateXRatio,
  calculateYRatio,
  fillContext,
  setPositions,
} from '@/components/SearchBox/PriceArea/PriceChart/Chart/util';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/style';

export interface ChartProps {
  xDataset: number[];
  yDataset: number[];
  size: {
    width: number;
    height: number;
  };
  hasSlider: boolean;
  leftThumbX?: number;
  rightThumbX?: number;
}

const START_X = 0;

export default function Chart({
  xDataset,
  yDataset,
  size,
  hasSlider,
  leftThumbX,
  rightThumbX,
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = size;

  const maximumX = Math.max(...xDataset);
  const maximumY = Math.max(...yDataset);

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
    const xRatioDataset = xDataset.map(x => calculateXRatio(x, maximumX, width));
    const yRatioDataset = xDataset.map(y => calculateYRatio(y, maximumY, height));
    setPositions(context, xRatioDataset, yRatioDataset);

    context.stroke();
    fillContext(context, height, START_X, width, SECONDARY_COLOR);
  };

  const drawAciveChart = (leftX: number, rigthX: number) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.beginPath();

    const leftThumbIndex = xDataset.findIndex(element => element === leftThumbX);
    const leftY = yDataset[leftThumbIndex];

    const revisedRigthX = calculateXRatio(rigthX, maximumX, width);
    const revisedLeftX = calculateXRatio(leftX, maximumX, width);
    const revisedLeftY = calculateYRatio(leftY, maximumY, height);

    const leftIndex = xDataset.findIndex(element => element === leftX);

    const newXRatioDataset = xDataset
      .filter(x => leftX <= x && x <= rigthX)
      .map(x => calculateXRatio(x, maximumX, width));
    const newYRatioDataset = yDataset
      .filter((_, index) => index >= leftIndex)
      .map(y => calculateYRatio(y, maximumY, height));

    context.moveTo(revisedLeftX, revisedLeftY);
    setPositions(context, newXRatioDataset, newYRatioDataset);
    context.stroke();

    fillContext(context, height, revisedLeftX, revisedRigthX, PRIMARY_COLOR);
  };

  useEffect(() => {
    renderCanvas();
  }, []);

  useEffect(() => {
    drawBackgroundChart();
    if (hasSlider && leftThumbX !== undefined && rightThumbX !== undefined) {
      drawAciveChart(leftThumbX, rightThumbX);
    }
  }, [leftThumbX, rightThumbX]);

  return <canvas ref={canvasRef}></canvas>;
}
