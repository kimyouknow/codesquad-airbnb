import { useState } from 'react';

import Calendar from '@/components/CalendarCourousel/Calendar';
import {
  LAST_MONTH,
  INCREASED_YEAR,
  INCREASED_MONTH,
  INCREASED_SLIDE_X_COUNT,
  INITIAL_MOVE_X_COUNT,
  FIRST_MONTH,
  MONTH_LENGTH,
  DECREASE_YEAR,
  DECREASE_MONTH,
  SLIDE_ACTION,
} from '@/components/CalendarCourousel/constants';

import * as S from './style';

interface CalendarCaourselProps {
  initDate: Date;
  itemGap: number;
  showingCardNum: number;
  hiddenCardNum: number;
}

interface SlideAction {
  isSliding: boolean;
  actionType: typeof SLIDE_ACTION[keyof typeof SLIDE_ACTION];
}

export default function CalendarCaoursel({
  initDate,
  itemGap,
  showingCardNum,
  hiddenCardNum,
}: CalendarCaourselProps) {
  const initYear = initDate.getFullYear();
  const initMonth = initDate.getMonth();
  const slideCardsLength = showingCardNum + hiddenCardNum;

  const [activeMonth, setActiveMonth] = useState(initMonth);
  const [slideXCount, setSlideXCount] = useState(INITIAL_MOVE_X_COUNT);
  const [slideAction, setSlideAction] = useState<SlideAction>({
    isSliding: false,
    actionType: SLIDE_ACTION.PAUSE,
  });

  const calendarHeaderDate = getMonthsWithYear(slideCardsLength, activeMonth, initYear);

  const initializeSlideAction = () =>
    setSlideAction({ isSliding: false, actionType: SLIDE_ACTION.PAUSE });

  const handleClickPreviousCalendar = () => {
    setSlideAction({ isSliding: true, actionType: SLIDE_ACTION.LEFT });
    setSlideXCount(prev => prev - INCREASED_SLIDE_X_COUNT);
  };

  const handleClickNextCalendar = () => {
    setSlideAction({ isSliding: true, actionType: SLIDE_ACTION.RIGHT });
    setSlideXCount(prev => prev + INCREASED_SLIDE_X_COUNT);
  };

  const handleTransitionEnd = () => {
    setSlideXCount(INITIAL_MOVE_X_COUNT);
    const { isSliding, actionType } = slideAction;
    if (!isSliding) return;
    switch (actionType) {
      case SLIDE_ACTION.LEFT:
        setActiveMonth(prevMonth => prevMonth - DECREASE_MONTH);
        break;
      case SLIDE_ACTION.RIGHT:
        setActiveMonth(prevMonth => prevMonth + INCREASED_MONTH);
        break;
      default:
    }
    initializeSlideAction();
  };

  return (
    <S.CalendarContainer>
      <button type="button" onClick={handleClickPreviousCalendar} disabled={slideAction.isSliding}>
        이전달
      </button>
      <S.Wrapper>
        <S.ItemContainer
          slideXCount={slideXCount}
          canTransition={slideAction.isSliding}
          onTransitionEnd={handleTransitionEnd}
          showingCardNum={showingCardNum}
        >
          {calendarHeaderDate.map(({ year, month }) => (
            <S.Item key={`activeMonth-${month}`} itemGap={itemGap} showingCardNum={showingCardNum}>
              <Calendar activeMonth={month} activeYear={year} />
            </S.Item>
          ))}
        </S.ItemContainer>
      </S.Wrapper>
      <button type="button" onClick={handleClickNextCalendar} disabled={slideAction.isSliding}>
        다음달
      </button>
    </S.CalendarContainer>
  );
}

const getMonthsWithYear = (slideCardsLength: number, month: number, year: number) => {
  const calendarHeaderDate = Array.from({ length: slideCardsLength }, (_, index) => {
    const currentMonth = index - 1 + month;
    const monthWithYear = setYearWitMonth(year, currentMonth);
    return monthWithYear;
  });
  return calendarHeaderDate;
};

const isOverMonth = (month: number) => month > LAST_MONTH;

const isUnderMonth = (month: number) => month < FIRST_MONTH;

const setYearWitMonth = (year: number, month: number) => {
  const monthWithYear = { year, month: month };
  if (isOverMonth(month)) {
    monthWithYear.year = year + INCREASED_YEAR;
    monthWithYear.month = month - MONTH_LENGTH;
  }
  if (isUnderMonth(month)) {
    monthWithYear.year = year - DECREASE_YEAR;
    monthWithYear.month = month + MONTH_LENGTH;
  }
  return monthWithYear;
};
