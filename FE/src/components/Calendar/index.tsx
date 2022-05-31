/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
import { months, daysOfWeek, saturdayToNumber } from '@/constants/constants';

import * as S from './style';

interface CalendarProps {
  activeYear: number;
  activeMonth: number;
}

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
    <S.Container>
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
    </S.Container>
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

const renderPrevMonthLastWeek = (
  prevMonthLastDay: number,
  prevMonthLastDate: number,
  year: number,
  month: number,
): Array<RenderDateProps> =>
  isSaturDay(prevMonthLastDay)
    ? renderDates({
        length: prevMonthLastDay + 1,
        year,
        month,
        addedDate: prevMonthLastDate - prevMonthLastDay - 1,
        isAciveMonth: false,
      })
    : [];

const renderNextMonthFirstWeek = (
  activeMonthLastDay: number,
  year: number,
  month: number,
): Array<RenderDateProps> =>
  isSaturDay(activeMonthLastDay)
    ? renderDates({
        length: saturdayToNumber - activeMonthLastDay,
        year,
        month,
        addedDate: 0,
        isAciveMonth: false,
      })
    : [];

const renderDates = ({
  length,
  year,
  month,
  addedDate,
  isAciveMonth,
}: RenderDatesProps): Array<RenderDateProps> =>
  Array.from({ length }, (_, i) =>
    renderDate({
      year,
      month,
      date: i + addedDate + 1,
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

const isSaturDay = (numberOfDay: number) => numberOfDay !== saturdayToNumber;
