import styled from 'styled-components';

export const Container = styled.div<{ containerWidth: number; containerHeight: number }>`
  width: 493px;
  height: 364px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 0.1), 0px 0px 4px rgba(51, 51, 51, 0.05);
  border-radius: 40px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 52px 64px;
`;

export const PriceInfo = styled.div`
  h3 {
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
  }
  span {
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    /* Gray 3 */
    color: #828282;
  }
`;
