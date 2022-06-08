import { changeNumberToKoreanLocaleMoney } from '@/utils';

interface PriceInfoProps {
  minimunX: number;
  maximumX: number;
  selectablePriceAverage: number;
}

export default function PriceInfo({ minimunX, maximumX, selectablePriceAverage }: PriceInfoProps) {
  return (
    <div>
      <div>
        <h3>가격 범위</h3>
        <span>
          {changeNumberToKoreanLocaleMoney(minimunX)}~{changeNumberToKoreanLocaleMoney(maximumX)}
        </span>
        <span>
          평균 1박 요금은 {changeNumberToKoreanLocaleMoney(selectablePriceAverage)}원 입니다.
        </span>
      </div>
    </div>
  );
}
