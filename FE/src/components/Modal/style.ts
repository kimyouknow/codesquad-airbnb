import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
`;

export const ModalContainer = styled.div`
  margin-top: 200px;
  display: inline-block;
  z-index: 1012;
  position: relative;
  border-radius: 6px;
  user-select: none;
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;
