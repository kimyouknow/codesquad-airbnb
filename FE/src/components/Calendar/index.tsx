/* eslint-disable @typescript-eslint/no-use-before-define */
import * as S from './style';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export default function Calendar() {
  const overDay = 32;
  const targetDay = 1;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const lastDay = overDay - new Date(year, month, overDay).getDate();
  const originDay = new Date(year, month, targetDay).getDay();
  const computedDay = originDay - 1;
  const sunday = 6;
  const isDaySunday = computedDay < 0;
  /* firstDayOfWeek
   0  1  2  3  4  5  6
   일 월 화 수 목 금 토
 ->월 화 수 목 금 토 일
  */
  const firstDayOfWeek = isDaySunday ? sunday : computedDay;

  const days = orderDayByDayOfWeek(lastDay, firstDayOfWeek);

  return (
    <>
      <S.CalendarTitle>{`${months[month]} ${year}`}</S.CalendarTitle>
      <S.WeekContainer>
        {daysOfWeek.map(day => (
          <S.DayItem key={`day-${day}`}>{day}</S.DayItem>
        ))}
      </S.WeekContainer>
      <S.WeekContainer>
        {days.map((day, index) =>
          index < firstDayOfWeek ? (
            <S.DayItem key={`day-${index}`}></S.DayItem>
          ) : (
            <S.DayItem key={`day-${index}`}>{day}</S.DayItem>
          ),
        )}
      </S.WeekContainer>
    </>
  );
}

function orderDayByDayOfWeek(lastDay: number, firstDayOfWeek: number) {
  return Array.from({ length: lastDay }, (_, index: number) => index - firstDayOfWeek + 1);
}
