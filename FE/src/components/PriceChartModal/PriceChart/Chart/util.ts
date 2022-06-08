export const calculateXRatio = (rawX: number, maximumX: number, width: number) =>
  (rawX / maximumX) * width;

export const calculateYRatio = (rawY: number, maximumY: number, height: number) =>
  height - (rawY / maximumY) * height;

export const setPositions = (
  context: CanvasRenderingContext2D,
  xDataset: number[],
  yDataset: number[],
) => {
  xDataset.forEach((x, index) => {
    const y = yDataset[index];
    context.lineTo(x, y);
  });
};

export const fillContext = (
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
