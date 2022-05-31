/* eslint-disable @typescript-eslint/no-use-before-define */
import { months, daysOfWeek } from '@/constants/constants';

import * as S from './style';

interface CalendarProps {
  activeYear: number;
  activeMonth: number;
}

interface DateProps {
  year: number;
  month: number;
  date: number;
}

interface RenderDateProps extends DateProps {
  id: Date;
  isAciveMonth: boolean;
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
        {dates.map(({ id, date, isAciveMonth }) => (
          <S.DayItem isAciveMonth={isAciveMonth} key={id}>
            {date}
          </S.DayItem>
        ))}
      </S.WeekContainer>
    </div>
  );
}

function renderCalendar({ activeYear, activeMonth }: CalendarProps): Array<RenderDateProps> {
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
    activeMonth,
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
}

function renderPrevMonthLastWeek(
  prevMonthLastDay: number,
  prevMonthLastDate: number,
  year: number,
  month: number,
): Array<RenderDateProps> {
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
}

function renderNextMonthFirstWeek(
  activeMonthLastDay: number,
  year: number,
  month: number,
): Array<RenderDateProps> {
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
}

function renderDates({ length, year, month, addedDate }: RenderDatesProps): Array<RenderDateProps> {
  // TODO: //  RenderDateProps[] 배열 타입 지정 고려해보기
  return Array.from({ length }, (v, i) =>
    renderDate({
      year,
      month,
      date: i + 1 + addedDate,
    }),
  );
}

function renderDate({ year, month, date }: DateProps): RenderDateProps {
  return {
    id: new Date(year, month, date),
    year,
    month,
    date,
    isAciveMonth: false,
  };
}
