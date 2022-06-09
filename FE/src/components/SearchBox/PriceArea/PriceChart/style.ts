import styled from 'styled-components';

export const Container = styled.div`
  width: 400px;
  height: 360px;
  gap: 16px;
  padding: 52px 64px;
`;

// FIXME: 임시 스타일 -> 선택자 정리할 필요가 있어요!
export const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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

export const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  div:last-child {
    /* FIXME: multi ranger 세부위치 조정 */
  }
`;
