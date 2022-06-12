import styled, { css } from 'styled-components';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/style';

import { CANVAS_WIDTH } from './constants';
import containerSize from './mixins';

const THUMB_SIZE = '16px';

export const CanvasContainer = styled.div`
  ${containerSize}
`;

export const SliderController = styled.input`
  width: ${CANVAS_WIDTH}px;
  position: absolute;
  pointer-events: none; // 범위 range 이벤트 중지
  z-index: 3;
  appearance: none;
  opacity: 0;
  ::-webkit-slider-thumb {
    pointer-events: all; // thumb 이벤트 감지
    appearance: none;
    cursor: pointer;
    width: ${THUMB_SIZE};
    height: 4rem;
  }
`;

export const VirtualSlider = styled.div`
  position: relative;
  z-index: 1;
  left: 30px;
  height: 10px;
`;

export const Track = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: ${SECONDARY_COLOR};
`;

export const Range = styled.div`
  position: absolute;
  z-index: 2;
  left: ${({ moveLeftThumbX }) => moveLeftThumbX}%;
  right: ${({ moveRightThumbX }) => moveRightThumbX}%;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: ${PRIMARY_COLOR};
`;

const thumb = css`
  position: absolute;
  z-index: 3;
  width: ${THUMB_SIZE};
  height: 16px;
  background-color: ${PRIMARY_COLOR};
  border-radius: 50%;
  top: 7px;
`;

export const LeftThumb = styled.div`
  ${thumb}
  left: calc(${({ moveLeftThumbX }) => moveLeftThumbX}% + ${THUMB_SIZE});
  transform: translate(-100%, -60%);
`;

export const RightThumb = styled.div`
  ${thumb}
  right: calc(${({ moveRightThumbX }) => moveRightThumbX}% + ${THUMB_SIZE});
  transform: translate(100%, -60%);
`;
