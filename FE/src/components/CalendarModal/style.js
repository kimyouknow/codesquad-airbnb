/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const CalendarContainer = styled.div`
  width: 440px;
  height: 440px;
  display: 'flex';
  gap: '12px';
`;

export const Wrapper = styled.div`
  overflow: hidden;
`;

export const ItemContainer = styled.ul`
  display: flex;
  width: 100%;
  padding: 0; // TODO : reset css 적용시 삭제하기
  transition: ${({ transtion }) => transtion};
  transform: ${({ nextCount }) =>
    nextCount === 0 ? `translateX(-50%)` : `translateX(${-50 * nextCount}%)`};
`;

export const Item = styled.li`
  flex-shrink: 0;
  width: ${({ itemGap }) => `calc(50% - ${itemGap}px)`};
  margin: 0 ${({ itemGap }) => itemGap / 2}px;
  list-style: none; // TODO : reset css 적용시 삭제하기
`;
