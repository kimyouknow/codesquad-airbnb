import { useEffect, useRef } from 'react';

const container = {
  width: '300px',
  height: '300px',
};

const data = [
  { label: 'asd', x: 0, y: 0 },
  { label: 'z', x: 1, y: 400 },
  { label: 'dfa', x: 2, y: 200 },
  { label: 'wsa', x: 3, y: 100 },
  { label: 'hh', x: 4, y: 300 },
  { label: 'ert', x: 5, y: 500 },
  { label: 'Snbx', x: 6, y: 100 },
];

export default function CanvasLineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawLine = () => {
    // canvas 자체
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 300;
    canvas.height = 300;
    // 선그리는 로직
  };

  useEffect(() => {
    drawLine();
  }, []);
  return (
    <div style={container}>
      <canvas style={{ ...container, border: '3px solid #ccc' }} ref={canvasRef}></canvas>
    </div>
  );
}
