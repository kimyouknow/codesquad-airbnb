import styled from 'styled-components';

export const CalendarContainer = styled.div`
  display: 'flex';
  gap: '12px';
`;

export const Wrapper = styled.div`
  overflow: hidden;
`;

export const ItemContainer = styled.ul<{
  canTransition: boolean;
  slideXCount: number;
  showingCardNum: number;
}>`
  display: flex;
  width: 100%;
  padding: 0; // TODO : reset css 적용시 삭제하기
  transition: ${({ canTransition }) => canTransition && 'transform 0.5s linear 0s'};
  transform: ${({ slideXCount, showingCardNum }) =>
    `translateX(${-(100 / showingCardNum) * slideXCount}%)`};
`;

export const Item = styled.li<{
  itemGap: number;
  showingCardNum: number;
}>`
  flex-shrink: 0;
  width: ${({ itemGap, showingCardNum }) => `calc(${100 / showingCardNum}% - ${itemGap}px)`};
  margin: 0 ${({ itemGap }) => itemGap / 2}px;
  list-style: none; // TODO : reset css 적용시 삭제하기
`;
