import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  position: absolute;
  width: 916px;
  height: 76px;
  left: 262px;
  top: 110px;
  background: #ffffff;
  border: 1px solid #bdbdbd;
  border-radius: 60px;
`;

const commonPartStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 296px;
  padding: 16px 24px;
  cursor: pointer;
  &:not(:first-of-type)::before {
    content: '';
    position: absolute;
    left: 0;
    display: block;
    width: 1px;
    height: 60%;
    background-color: #bdbdbd;
  }
`;

export const CalendarPart = styled.div`
  ${commonPartStyle}
`;
export const PricePart = styled.div`
  ${commonPartStyle}
`;
export const PeoplePart = styled.div`
  ${commonPartStyle}
`;

export const Label = styled.h3`
  width: 112px;
  height: 17px;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  text-transform: uppercase;
  color: #010101;
  flex: none;
  order: 0;
  flex-grow: 0;
`;
