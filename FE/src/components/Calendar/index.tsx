/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
import { months, daysOfWeek } from '@/constants/constants';

import * as S from './style';

interface CalendarProps {
  activeYear: number;
  activeMonth: number;
}

// TODO: interface DateProps하나에서 extends해서 확장해서 써보기
interface DateProps {
  year: number;
  month: number;
  date: number;
  isAciveMonth: boolean;
}

interface RenderDateProps extends DateProps {
  id: Date;
}

interface RenderDatesProps {
  year: number;
  month: number;
  length: number;
  addedDate: number;
  isAciveMonth: boolean;
}

export default function Calendar({ activeYear, activeMonth }: CalendarProps) {
  const dates = renderCalendar({ activeYear, activeMonth });
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <S.CalendarTitle>{`${months[activeMonth]} ${activeYear}`}</S.CalendarTitle>
      <S.WeekContainer>
        {daysOfWeek.map(day => (
          <S.DayItem key={`day-${day}`}>{day}</S.DayItem>
        ))}
      </S.WeekContainer>
      <S.WeekContainer>
        {/* FIXME: 키 값 겹치는 에러 수정하기 */}
        {dates.map(({ id, date, isAciveMonth }) => (
          <S.DayItem isAciveMonth={isAciveMonth} key={id}>
            {date}
          </S.DayItem>
        ))}
      </S.WeekContainer>
    </div>
  );
}

const renderCalendar = ({ activeYear, activeMonth }: CalendarProps): Array<RenderDateProps> => {
  const prevMonthLastFullDate = new Date(activeYear, activeMonth, 0);
  const prevMonthLastDay = prevMonthLastFullDate.getDay();
  const prevMonthLastDate = prevMonthLastFullDate.getDate();

  const activeMonthLastFullDate = new Date(activeYear, activeMonth + 1, 0);
  const activeMonthLastDay = activeMonthLastFullDate.getDay();
  const activeMonthLastDate = activeMonthLastFullDate.getDate();

  const prevMonthDates = renderPrevMonthLastWeek(
    prevMonthLastDay,
    prevMonthLastDate,
    activeYear,
    activeMonth - 1,
  );

  const currentMonthDates = renderDates({
    length: activeMonthLastDate,
    year: activeYear,
    month: activeMonth,
    addedDate: 0,
    isAciveMonth: true,
  });

  const nextMonthDates = renderNextMonthFirstWeek(activeMonthLastDay, activeYear, activeMonth + 1);

  return prevMonthDates.concat(currentMonthDates, nextMonthDates);
};

// TODO: 6 (getDay()로 얻은 토요일 값): 매직넘버 수정하기
const renderPrevMonthLastWeek = (
  prevMonthLastDay: number,
  prevMonthLastDate: number,
  year: number,
  month: number,
): Array<RenderDateProps> => {
  if (prevMonthLastDay !== 6) {
    return renderDates({
      length: prevMonthLastDay + 1,
      year,
      month,
      addedDate: prevMonthLastDate - prevMonthLastDay - 1,
      isAciveMonth: false,
    });
  }
  return [];
};

const renderNextMonthFirstWeek = (
  activeMonthLastDay: number,
  year: number,
  month: number,
): Array<RenderDateProps> => {
  if (activeMonthLastDay !== 6) {
    return renderDates({
      length: 6 - activeMonthLastDay,
      year,
      month,
      addedDate: 0,
      isAciveMonth: false,
    });
  }
  return [];
};

const renderDates = ({
  length,
  year,
  month,
  addedDate,
  isAciveMonth,
}: RenderDatesProps): Array<RenderDateProps> =>
  Array.from({ length }, (v, i) =>
    renderDate({
      year,
      month,
      date: i + 1 + addedDate,
      isAciveMonth,
    }),
  );

const renderDate = ({ year, month, date, isAciveMonth }: DateProps): RenderDateProps => ({
  id: new Date(year, month, date),
  year,
  month,
  date,
  isAciveMonth,
});
