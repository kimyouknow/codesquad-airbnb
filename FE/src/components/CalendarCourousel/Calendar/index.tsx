import { SelectedDateType } from '@/components/CalendarCourousel';
import { months, daysOfWeek, saturdayNumber } from '@/constants/constants';

import * as S from './style';

interface CalendarInfoType {
  year: number;
  month: number;
}

export interface FullDateProps {
  year: number;
  month: number;
  date: number;
}

interface CalendarProps extends CalendarInfoType {
  handleClickDay: (selectedDate: SelectedDateType) => void;
  handleMouseOverDay: (selectedDate: SelectedDateType) => void;
  handleMouseLeaveCalendar: () => void;
  checkIn: FullDateProps;
  checkOut: FullDateProps;
}

interface DateProps extends FullDateProps {
  isAciveMonth: boolean;
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

export default function Calendar({
  year,
  month,
  handleClickDay,
  handleMouseOverDay,
  handleMouseLeaveCalendar,
  checkIn,
  checkOut,
}: CalendarProps) {
  const dates = getCalendarInfo({ year, month });

  const checkIsSelectedDatePoint = (date: number) => {
    const isEqualWithCheckIn =
      checkIn.year === year && checkIn.month === month && checkIn.date === date;
    const isEqualWithCheckOut =
      checkOut.year === year && checkOut.month === month && checkOut.date === date;

    return isEqualWithCheckIn || isEqualWithCheckOut;
  };

  const checkIsSelectedDateRange = (date: number) => {
    const isInSelectedYearRange = checkIn.year <= year && year <= checkOut.year;
    const isInSelectedMonthRange = checkIn.month <= month && month <= checkOut.month;
    const isInSelectedDateRange = checkIn.date < date && date < checkOut.date;

    return isInSelectedYearRange && isInSelectedMonthRange && isInSelectedDateRange;
  };

  return (
    <S.Container>
      <S.CalendarTitle>{`${months[month]} ${year}`}</S.CalendarTitle>
      <S.WeekDayItemContainer>
        {daysOfWeek.map(day => (
          <S.WeekDayItem key={`day-${day}`}>{day}</S.WeekDayItem>
        ))}
      </S.WeekDayItemContainer>
      <S.WeekContainer onMouseLeave={handleMouseLeaveCalendar}>
        {dates.map(({ id, date, isAciveMonth }) => (
          <S.DayItem
            key={id}
            onClick={() => handleClickDay({ year, month, date })}
            onMouseOver={() => handleMouseOverDay({ year, month, date })}
            checkIn={checkIn}
            checkOut={checkOut}
            isSelectedDatePoint={checkIsSelectedDatePoint(date)}
            isSelectedDateRange={checkIsSelectedDateRange(date)}
            isAciveMonth={isAciveMonth}
          >
            {date}
          </S.DayItem>
        ))}
      </S.WeekContainer>
    </S.Container>
  );
}

const getCalendarInfo = ({ year, month }: CalendarInfoType): CalendarDateProps[] => {
  const prevMonthLastFullDate = new Date(year, month, 0);
  const prevMonthLastDay = prevMonthLastFullDate.getDay();
  const prevMonthLastDate = prevMonthLastFullDate.getDate();

  const activeMonthLastFullDate = new Date(year, month + 1, 0);
  const activeMonthLastDay = activeMonthLastFullDate.getDay();
  const activeMonthLastDate = activeMonthLastFullDate.getDate();

  const prevMonthDates = getPrevMonthLastWeek(prevMonthLastDay, prevMonthLastDate, year, month - 1);

  const currentMonthDates = getDates({
    length: activeMonthLastDate,
    year,
    month,
    addedDate: 0,
    isAciveMonth: true,
  });

  const nextMonthDates = getNextMonthFirstWeek(activeMonthLastDay, year, month + 1);

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
