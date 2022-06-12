import styled, { css } from 'styled-components';

import { FullDateProps } from '@/components/SearchBox/CalendarArea/CalendarCourousel/Calendar';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CalendarTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const calendarWeekConater = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  padding: 0;
  list-style: none; // Todo: global style로 빼기
`;

export const WeekContainer = styled.ul`
  ${calendarWeekConater}
`;

const textCenter = css`
  text-align: center;
`;

export const WeekDayItemContainer = styled.ul`
  ${calendarWeekConater}
`;

export const WeekDayItem = styled.li`
  ${textCenter}
`;

export const DayItem = styled.li<{
  checkIn: FullDateProps;
  checkOut: FullDateProps;
  isSelectedDatePoint: boolean;
  isSelectedDateRange: boolean;
  isAciveMonth: boolean;
}>`
  ${textCenter}
  :hover {
    background-color: wheat;
  }
  background-color: ${({ isSelectedDatePoint, isAciveMonth }) =>
    isSelectedDatePoint && isAciveMonth ? '#808080' : ''};
  background-color: ${({ isSelectedDateRange, isAciveMonth }) =>
    isSelectedDateRange && isAciveMonth ? '#D3D3D3' : ''};
  color: ${({ isAciveMonth }) => (isAciveMonth ? 'black' : '#D3D3D3')};
  pointer-events: ${({ isAciveMonth }) => (isAciveMonth ? 'all' : 'none')};
  border-radius: 50%;
  margin: 10px;
`;
