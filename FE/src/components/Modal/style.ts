import styled, { css, CSSProp } from 'styled-components';

export const defaultStyle = {
  overlay: css`
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    z-index: 1022;
    background-color: 'rgba(255, 255, 255, 0.75)';
  `,
  content: css`
    display: inline-block;
    z-index: 1012;
    position: relative;
    border-radius: 6px;
    user-select: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  button: css`
    position: absolute;
    right: 10px;
    top: 6px;
    font-size: 30px;
  `,
};

export const Overlay = styled.div<{ customStyle: CSSProp }>`
  ${({ customStyle }) => customStyle}
`;

export const Content = styled.div<{ customStyle: CSSProp }>`
  ${({ customStyle }) => customStyle}
`;

export const CloseButton = styled.button<{ customStyle: CSSProp }>`
  cursor: pointer;
  background: transparent;
  border: none;
  ${({ customStyle }) => customStyle}
`;
