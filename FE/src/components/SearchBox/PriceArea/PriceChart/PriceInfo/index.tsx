import { changeNumberToKoreanLocaleMoney } from '@/utils';

import * as S from '../style';

interface PriceInfoProps {
  minimunX: number;
  maximumX: number;
  selectablePriceAverage: number;
}

export default function PriceInfo({ minimunX, maximumX, selectablePriceAverage }: PriceInfoProps) {
  return (
    <S.PriceInfo>
      <h3>가격 범위</h3>
      <span>
        {changeNumberToKoreanLocaleMoney(minimunX)} ~ {changeNumberToKoreanLocaleMoney(maximumX)}
      </span>
      <p>평균 1박 요금은 {changeNumberToKoreanLocaleMoney(selectablePriceAverage)}원 입니다.</p>
    </S.PriceInfo>
  );
}
