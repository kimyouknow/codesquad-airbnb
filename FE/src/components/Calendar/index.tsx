/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
import { months, daysOfWeek, saturdayNumber } from '@/constants/constants';

import * as S from './style';

interface CalendarProps {
  activeYear: number;
  activeMonth: number;
}

interface DateProps {
  year: number;
  month: number;
  isAciveMonth: boolean;
  date: number;
}

interface CalendarDateProps extends DateProps {
  id: string;
}

interface DatesProps {
  year: number;
  month: number;
  isAciveMonth: boolean;
  length: number;
  addedDate: number;
}

export default function Calendar({ activeYear, activeMonth }: CalendarProps) {
  const dates = getCalendarInfo({ activeYear, activeMonth });
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

const getCalendarInfo = ({ activeYear, activeMonth }: CalendarProps): CalendarDateProps[] => {
  const prevMonthLastFullDate = new Date(activeYear, activeMonth, 0);
  const prevMonthLastDay = prevMonthLastFullDate.getDay();
  const prevMonthLastDate = prevMonthLastFullDate.getDate();

  const activeMonthLastFullDate = new Date(activeYear, activeMonth + 1, 0);
  const activeMonthLastDay = activeMonthLastFullDate.getDay();
  const activeMonthLastDate = activeMonthLastFullDate.getDate();

  const prevMonthDates = getPrevMonthLastWeek(
    prevMonthLastDay,
    prevMonthLastDate,
    activeYear,
    activeMonth - 1,
  );

  const currentMonthDates = getDates({
    length: activeMonthLastDate,
    year: activeYear,
    month: activeMonth,
    addedDate: 0,
    isAciveMonth: true,
  });

  const nextMonthDates = getNextMonthFirstWeek(activeMonthLastDay, activeYear, activeMonth + 1);

  return prevMonthDates.concat(currentMonthDates, nextMonthDates);
};

const getPrevMonthLastWeek = (
  prevMonthLastDay: number,
  prevMonthLastDate: number,
  year: number,
  month: number,
): CalendarDateProps[] =>
  isSaturDay(prevMonthLastDay)
    ? getDates({
        length: prevMonthLastDay + 1,
        year,
        month,
        addedDate: prevMonthLastDate - prevMonthLastDay - 1,
        isAciveMonth: false,
      })
    : [];

const getNextMonthFirstWeek = (
  activeMonthLastDay: number,
  year: number,
  month: number,
): CalendarDateProps[] =>
  isSaturDay(activeMonthLastDay)
    ? getDates({
        length: saturdayNumber - activeMonthLastDay,
        year,
        month,
        addedDate: 0,
        isAciveMonth: false,
      })
    : [];

const getDates = ({
  length,
  year,
  month,
  addedDate,
  isAciveMonth,
}: DatesProps): CalendarDateProps[] =>
  Array.from({ length }, (_, i) =>
    getDate({
      year,
      month,
      date: i + addedDate + 1,
      isAciveMonth,
    }),
  );

const getDate = ({ year, month, date, isAciveMonth }: DateProps): CalendarDateProps => ({
  id: `${year}-${month}-${date}`,
  year,
  month,
  date,
  isAciveMonth,
});

const isSaturDay = (numberOfDay: number) => numberOfDay !== saturdayNumber;
