export function getNumberArrAverage(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b) / numbers.length;
}

export const changeNumberToKoreanLocaleMoney = (number: number) =>
  `₩${number.toLocaleString('ko-KR')}`;
