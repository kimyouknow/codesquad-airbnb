import { useEffect, useState } from 'react';
import { css } from 'styled-components';

import PriceChart from '@/components/SearchBox/PriceArea/PriceChart';
import { PriceChartData, PriceChartDataProps } from '@/data/chartData';
import WithModal from '@/hoc/WithModal';
import useToggle from '@/hooks/useToggle';

import * as S from '../style';

interface PriceAreaProps {
  wrapperId: string;
}

export default function PriceArea({ wrapperId }: PriceAreaProps) {
  const [chartInfo, setChartInfo] = useState<PriceChartDataProps[] | null>(null);
  const [isPriceChartModalOpen, handlePriceChartModalOpen] = useToggle(false);
  // FIXME: msw사용해서 데이터 fetching 요청 해보기
  useEffect(() => {
    setChartInfo(PriceChartData);
  }, []);
  return (
    <>
      <S.PricePart onClick={handlePriceChartModalOpen}>
        <S.Label>요금</S.Label>
      </S.PricePart>
      {chartInfo && (
        <WithModal
          wrapperId={wrapperId}
          isOpen={isPriceChartModalOpen}
          onClose={handlePriceChartModalOpen}
          customStyle={S.PriceModal}
        >
          <PriceChart
            chartInfo={chartInfo}
            axis={{ x: 'range', y: 'count' }}
            xStep={10_000}
            yStep={1}
          />
        </WithModal>
      )}
    </>
  );
}
