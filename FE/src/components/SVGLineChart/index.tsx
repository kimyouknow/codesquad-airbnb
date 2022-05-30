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

export default function SVGLineChart() {
  const points = data
    .map(element => {
      // svg에 표시할 때 px단위가 아니어서 비율로 계산
      const x = (element.x / 6) * 100;
      const y = 100 - (element.y / 500) * 100;

      return `${x},${y}`;
    })
    .join(' ');
  return (
    <div style={container}>
      <svg viewBox={`0 0 100 100`} style={{ border: '3px solid #ccc' }}>
        <polyline fill="none" stroke="tomato" strokeWidth={1} points={points} />
      </svg>
    </div>
  );
}
