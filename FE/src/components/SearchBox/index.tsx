import CalendarModal from '@/components/SearchBox/CalendarModal';
import PriceChartModal from '@/components/SearchBox/PriceChartModal';
import useToggle from '@/hooks/useToggle';

import * as S from './style';

export default function SearchBox() {
  const [isCalendarModalOpen, handleCalendarModalOpen] = useToggle(false);
  const [isPriceChartModalOpen, handlePriceChartModalOpen] = useToggle(false);
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
      <CalendarModal isModalOpen={isCalendarModalOpen} handleOpenModal={handleCalendarModalOpen} />
      <PriceChartModal
        isModalOpen={isPriceChartModalOpen}
        handleOpenModal={handlePriceChartModalOpen}
      />
    </S.Container>
  );
}
