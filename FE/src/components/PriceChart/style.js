import styled from 'styled-components';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

export const CanvasContainer = styled.div`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
`;

export const Canvas = styled.canvas`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
  border: 3px solid #ccc;
`;
