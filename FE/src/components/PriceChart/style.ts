import styled from 'styled-components';

export const Container = styled.div<{ containerWidth: number; containerHeight: number }>`
  width: ${({ containerWidth }) => `${containerWidth}px`};
  height: ${({ containerHeight }) => `${containerHeight}px`};
`;
