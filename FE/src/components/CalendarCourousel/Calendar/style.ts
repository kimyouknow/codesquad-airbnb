import styled, { css } from 'styled-components';

import { FullDateProps } from '@/components/CalendarCourousel/Calendar';

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

export const WeekContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  padding: 0;
  list-style: none; // Todo: global style로 빼기
`;

const textCenter = css`
  text-align: center;
`;
export const WeekDayItem = styled.li`
  ${textCenter}
`;

export const DayItem = styled.li<{
  checkIn: FullDateProps;
  checkOut: FullDateProps;
  isSelectedDatePoint: boolean;
  isSelectedDateRange: boolean;
}>`
  ${textCenter}
  :hover {
    background-color: wheat;
  }
  background-color: ${({ isSelectedDatePoint }) => (isSelectedDatePoint ? '#808080' : '')};
  background-color: ${({ isSelectedDateRange }) => (isSelectedDateRange ? '#D3D3D3' : '')};
  border-radius: 50%;
  margin: 10px;
`;
