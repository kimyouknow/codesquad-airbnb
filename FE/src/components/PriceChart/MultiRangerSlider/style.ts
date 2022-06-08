import styled, { css } from 'styled-components';

const THUMB_SIZE = '16px';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 300px;
  height: 10px;
  background-color: wheat;
`;

const thumb = css`
  -webkit-appearance: none;
  cursor: pointer;
  pointer-events: auto; // thumb 이벤트 감지
  width: ${THUMB_SIZE};
  height: ${THUMB_SIZE};
  z-index: 10;
  border-radius: 50%;
  background-color: tomato;
  box-shadow: 0 0 3px 0 #222;
`;

export const InputRange = styled.input`
  width: 100%;
  -webkit-appearance: none;
  position: absolute;
  pointer-events: none; // 범위 range 이벤트 중지
  z-index: 3;
  background: transparent;
  border-radius: 5px;
  &::-webkit-slider-thumb {
    ${thumb}
  }
  &::-moz-range-thumb {
    ${thumb}
  }
  &::-ms-thumb {
    ${thumb}
  }
`;

export const ActiveRange = styled.div<{ moveLeftThumbX: number; moveRightThumbX: number }>`
  position: absolute;
  z-index: 2;
  left: ${({ moveLeftThumbX }) => moveLeftThumbX}%;
  right: ${({ moveRightThumbX }) => moveRightThumbX}%;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: tomato;
`;
