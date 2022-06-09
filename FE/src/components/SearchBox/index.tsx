import { useEffect, useState } from 'react';

import CalendarCaoursel from '@/components/SearchBox/CalendarCourousel';
import PriceChart from '@/components/SearchBox/PriceChart';
import { PriceChartData, PriceChartDataProps } from '@/data/chartData';
import WithModal from '@/hoc/WithModal';
import useToggle from '@/hooks/useToggle';

import * as S from './style';

const SEACH_BOX_MODAL_ID = 'seachBox-Modal';

export default function SearchBox() {
  const [isCalendarModalOpen, handleCalendarModalOpen] = useToggle(false);
  const [isPriceChartModalOpen, handlePriceChartModalOpen] = useToggle(false);
  const [chartInfo, setChartInfo] = useState<PriceChartDataProps[] | null>(null);

  // FIXME: msw사용해서 데이터 fetching 요청 해보기
  useEffect(() => {
    setChartInfo(PriceChartData);
  }, []);
  return (
    <S.Container>
      <S.CalendarPart onClick={handleCalendarModalOpen}>
        <S.Label>체크인</S.Label>
        <S.Label>체크아웃</S.Label>
      </S.CalendarPart>
      <S.PricePart onClick={handlePriceChartModalOpen}>
        <S.Label>요금</S.Label>
      </S.PricePart>
      <S.PeoplePart>
        <S.Label>인원</S.Label>
      </S.PeoplePart>
      <WithModal
        wrapperId={SEACH_BOX_MODAL_ID}
        isOpen={isCalendarModalOpen}
        onClose={handleCalendarModalOpen}
      >
        <CalendarCaoursel initDate={new Date()} itemGap={26} showingCardNum={2} hiddenCardNum={2} />
      </WithModal>
      {chartInfo && (
        <WithModal
          wrapperId={SEACH_BOX_MODAL_ID}
          isOpen={isPriceChartModalOpen}
          onClose={handlePriceChartModalOpen}
        >
          <PriceChart
            chartInfo={chartInfo}
            axis={{ x: 'range', y: 'count' }}
            xStep={10_000}
            yStep={1}
          />
        </WithModal>
      )}
    </S.Container>
  );
}
