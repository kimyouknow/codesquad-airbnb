import { useState } from 'react';

import Calendar from '@/components/Calendar';
import {
  LAST_MONTH,
  INCREASED_YEAR,
  INCREASED_MONTH,
  HIDDEN_CARD_NUM,
  INCREASED_SLIDE_X_COUNT,
  INITIAL_MOVE_X_COUNT,
  FIRST_MONTH,
  MONTH_LENGTH,
  DECREASE_YEAR,
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
  const yearToday = today.getFullYear(); // FIXME: yearToday가 더 낫나요?ㅎㅎㅎ
  const monthToday = today.getMonth();

  const itemGap = 26;
  const showingCardNum = 2;
  const slideCardsLength = showingCardNum + HIDDEN_CARD_NUM;

  const [activeMonth, setActiveMonth] = useState(monthToday);
  const [slideXCount, setSlideXCount] = useState(1);
  const [isRightSliding, setIsRightSliding] = useState(false);
  const [isLeftSliding, setIsLeftSliding] = useState(false);

  const calendarHeaderDate = getMonthsWithYear(slideCardsLength, activeMonth, yearToday);

  const handleClickPreviousCalendar = () => {
    setIsLeftSliding(true);
    setSlideXCount(prev => prev - INCREASED_SLIDE_X_COUNT);
  };

  const handleClickNextCalendar = () => {
    setIsRightSliding(true);
    setSlideXCount(prev => prev + INCREASED_SLIDE_X_COUNT);
  };

  const handleTransitionEnd = () => {
    setSlideXCount(INITIAL_MOVE_X_COUNT);
    if (isRightSliding) {
      setIsRightSliding(false);
      setActiveMonth(prevMonth => prevMonth + INCREASED_MONTH);
    }
    if (isLeftSliding) {
      setIsLeftSliding(false);
      setActiveMonth(prevMonth => prevMonth - INCREASED_MONTH);
    }
  };

  return (
    <WindowModal show={true} handleOpenModal={handleOpenModal}>
      <S.CalendarContainer>
        <button type="button" onClick={handleClickPreviousCalendar} disabled={isLeftSliding}>
          이전달
        </button>
        <S.Wrapper>
          <S.ItemContainer
            slideXCount={slideXCount}
            isLeftSliding={isLeftSliding}
            isRightSliding={isRightSliding}
            onTransitionEnd={handleTransitionEnd}
            showingCardNum={showingCardNum}
          >
            {calendarHeaderDate.map(({ year, month }) => (
              <S.Item
                key={`activeMonth-${month}`}
                itemGap={itemGap}
                showingCardNum={showingCardNum}
              >
                <Calendar activeMonth={month} activeYear={year} />
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

const isOverMonth = (month: number) => month > LAST_MONTH;

const isUnerMonth = (month: number) => month < FIRST_MONTH;

const getMonthsWithYear = (slideCardsLength: number, month: number, year: number) => {
  const calendarHeaderDate = Array.from({ length: slideCardsLength }, (_, index) => {
    const currentMonth = index - 1 + month;
    const monthWithYear = { year, month: currentMonth };
    if (isOverMonth(currentMonth)) {
      monthWithYear.year = year + INCREASED_YEAR;
      monthWithYear.month = currentMonth - MONTH_LENGTH;
    }
    if (isUnerMonth(currentMonth)) {
      monthWithYear.year = year - DECREASE_YEAR;
      monthWithYear.month = currentMonth + MONTH_LENGTH;
    }
    return monthWithYear;
  });
  return calendarHeaderDate;
};
