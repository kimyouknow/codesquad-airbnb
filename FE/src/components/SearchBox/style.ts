import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  position: relative;
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

const commentModalOverlay = css`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
  background-color: 'rgba(255, 255, 255, 0.75)';
`;
const commentModalContent = css`
  display: inline-block;
  z-index: 1012;
  position: relative;
  border-radius: 6px;
  user-select: none;
  background: #ffffff;
  border-radius: 40px;
  border: 1px solid black;
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 0.1), 0px 0px 4px rgba(51, 51, 51, 0.05);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
const commentModalButton = css`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
`;

export const CalendarModal = {
  overlay: css`
    ${commentModalOverlay}
  `,
  content: css`
    ${commentModalContent}
    top: 200px;
    left: 300px;
    width: 916px;
    height: 512px;
    padding: 70px 97px;
  `,
  button: css`
    ${commentModalButton}
  `,
};

export const PriceModal = {
  overlay: css`
    ${commentModalOverlay}
  `,
  content: css`
    ${commentModalContent}
    top: 200px;
    left: 500px;
    width: 493px;
    height: 364px;
  `,
  button: css`
    ${commentModalButton}
  `,
};

export const PeopleModal = {
  overlay: css`
    ${commentModalOverlay}
  `,
  content: css`
    ${commentModalContent}
    top: 180px;
    left: 300px;
  `,
  button: css`
    ${commentModalButton}
  `,
};
