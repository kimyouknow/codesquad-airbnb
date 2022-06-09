import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
  background-color: 'rgba(255, 255, 255, 0.75)';
`;

export const Content = styled.div`
  margin-top: 200px;
  display: inline-block;
  z-index: 1012;
  position: relative;
  border-radius: 6px;
  user-select: none;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;
