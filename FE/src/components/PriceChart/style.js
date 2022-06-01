import styled from 'styled-components';

import containerSize from './mixins';

export const CanvasContainer = styled.div`
  ${containerSize}
`;

export const Canvas = styled.canvas`
  ${containerSize}
  border: 3px solid #ccc;
`;
