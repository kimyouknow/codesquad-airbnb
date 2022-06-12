import styled from 'styled-components';

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

export const DayItem = styled.li`
  text-align: center;
`;
