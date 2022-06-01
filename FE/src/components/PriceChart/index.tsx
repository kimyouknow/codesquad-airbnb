import { useEffect, useLayoutEffect, useRef } from 'react';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/components/PriceChart/constants';

import * as S from './style';

interface RoomCapacityType {
  range: number;
  count: number;
}

const START_X = 0;

export default function PriceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderCanvas = () => {
    // canvas 자체
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  };

  const drawLine = () => {
    // 선그리는 로직
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.beginPath();
    context.moveTo(START_X, CANVAS_HEIGHT); // 시작점으로 이동

    setPositions(context, data);

    context.stroke(); // 선 그리기
    fillContext(context);
  };

  useLayoutEffect(() => {
    renderCanvas();
  }, []);

  useEffect(() => {
    drawLine();
  }, []);

  return (
    <S.CanvasContainer>
      <S.Canvas ref={canvasRef}></S.Canvas>
    </S.CanvasContainer>
  );
}

const setPositions = (context: CanvasRenderingContext2D, roomCapacities: RoomCapacityType[]) => {
  const maxRange = Math.max(...roomCapacities.map(({ range }) => range));
  const maxCount = Math.max(...roomCapacities.map(({ count }) => count));

  roomCapacities.forEach(({ range, count }) => {
    const x = (range / maxRange) * CANVAS_WIDTH;
    const y = CANVAS_HEIGHT - (count / maxCount) * CANVAS_HEIGHT;
    context.lineTo(x, y);
  });
};

const fillContext = (context: CanvasRenderingContext2D) => {
  context.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT); // 좌표 맨 오른쪽 끝
  context.lineTo(0, CANVAS_HEIGHT); // 좌표 시작으로 다시 가기
  context.fillStyle = 'rgb(93, 92, 92)';
  context.globalCompositeOperation = 'destination-over'; // draw behind border를 색칠한 부분 뒤로 보냄
  context.fill(); // will close the path for us (Every time this method is called, the list is reset and we can start drawing new shapes.)
};

const data = [
  { range: 10000, count: 33 },
  { range: 20000, count: 31 },
  { range: 30000, count: 33 },
  { range: 40000, count: 45 },
  { range: 50000, count: 31 },
  { range: 60000, count: 43 },
  { range: 70000, count: 70 },
  { range: 80000, count: 43 },
  { range: 90000, count: 37 },
  { range: 100000, count: 32 },
  { range: 110000, count: 35 },
  { range: 120000, count: 45 },
  { range: 130000, count: 21 },
  { range: 140000, count: 54 },
  { range: 150000, count: 71 },
  { range: 160000, count: 35 },
  { range: 170000, count: 16 },
  { range: 180000, count: 13 },
  { range: 190000, count: 4 },
  { range: 200000, count: 18 },
  { range: 210000, count: 54 },
  { range: 220000, count: 66 },
  { range: 230000, count: 31 },
  { range: 240000, count: 37 },
  { range: 250000, count: 9 },
  { range: 260000, count: 41 },
  { range: 270000, count: 76 },
  { range: 280000, count: 47 },
  { range: 290000, count: 64 },
  { range: 300000, count: 69 },
];
