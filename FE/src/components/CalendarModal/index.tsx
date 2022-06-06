import { useState } from 'react';

import Calendar from '@/components/Calendar';
import {
  LAST_MONTH,
  INCREASED_YEAR,
  INCREASED_MONTH,
  HIDDEN_CARD_NUM,
  INCREASED_SLIDE_X_COUNT,
  INITIAL_MOVE_X_COUNT,
} from '@/components/CalendarModal/constants';

import WindowModal from '../WindowModal';
import * as S from './style';

interface CalendarModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function CalendarModal({ isModalOpen, handleOpenModal }: CalendarModalProps) {
  // TODO: date formater util로 분리하기
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const [activeMonth, setActiveMonth] = useState(month);

  const itemGap = 26;
  const showingCardNum = 2;
  const slideCardsLength = showingCardNum + HIDDEN_CARD_NUM;
  const initialYears = Array.from({ length: slideCardsLength }, () => year);
  const initialMonths = Array.from(
    { length: slideCardsLength },
    (_, index) => index - 1 + activeMonth,
  );

  const [months, setMonths] = useState(initialMonths);
  const [years, setYears] = useState(initialYears);
  const [slideXCount, setSlideXCount] = useState(1);
  const [isRightSliding, setIsRightSliding] = useState(false);

  const handleClickPreviousCalendar = () => {};

  const handleClickNextCalendar = () => {
    setIsRightSliding(true);
    setSlideXCount(slideXCount + INCREASED_SLIDE_X_COUNT);
  };

  const handleTransitionEnd = () => {
    if (isRightSliding) {
      const [newYears, newMonths] = getNextMonthsNyears(months, years);
      setActiveMonth(activeMonth + INCREASED_MONTH);
      setSlideXCount(INITIAL_MOVE_X_COUNT);
      setMonths([...newMonths]);
      setYears([...newYears]);
      setIsRightSliding(false);
    }
  };

  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      <S.CalendarContainer>
        {/* TODO: activeMonth + magic number 수정하기 */}
        <button type="button" onClick={handleClickPreviousCalendar} disabled={isRightSliding}>
          이전달
        </button>
        <S.Wrapper>
          <S.ItemContainer
            slideXCount={slideXCount}
            isRightSliding={isRightSliding}
            onTransitionEnd={handleTransitionEnd}
            showingCardNum={showingCardNum}
          >
            {months.map((currentActiveMonth, index) => (
              <S.Item
                key={`activeMonth-${currentActiveMonth}`}
                itemGap={itemGap}
                showingCardNum={showingCardNum}
              >
                <Calendar activeMonth={currentActiveMonth} activeYear={years[index]} />
              </S.Item>
            ))}
          </S.ItemContainer>
        </S.Wrapper>
        <button type="button" onClick={handleClickNextCalendar} disabled={isRightSliding}>
          다음달
        </button>
      </S.CalendarContainer>
    </WindowModal>
  );
}

const getNextMonthsNyears = (currentMonths: number[], currentYears: number[]) => {
  const newYears = [] as number[];
  const newMonths = [] as number[];

  currentMonths.forEach((currentMonth, index) => {
    const currentYear = currentYears[index];
    const isOutOfMonth = currentMonth >= LAST_MONTH;
    console.log(currentMonth);
    if (isOutOfMonth) {
      newYears.push(currentYear + INCREASED_YEAR);
      newMonths.push(currentMonth % LAST_MONTH);
    } else {
      newYears.push(currentYear);
      newMonths.push(currentMonth + INCREASED_MONTH);
    }
  });

  return [newYears, newMonths];
};
