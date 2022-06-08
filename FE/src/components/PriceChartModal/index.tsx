import { useEffect, useState } from 'react';

import PriceChart from '@/components/PriceChart';
import { PriceChartData, PriceChartDataProps } from '@/data/chartData';

import WindowModal from '../WindowModal';

interface CalendarModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function PriceChartModal({ isModalOpen, handleOpenModal }: CalendarModalProps) {
  const [chartInfo, setChartInfo] = useState<PriceChartDataProps[] | null>(null);
  useEffect(() => {
    setChartInfo(PriceChartData);
  }, []);
  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      {chartInfo && (
        <PriceChart
          chartInfo={chartInfo}
          axis={{ x: 'range', y: 'count' }}
          xStep={10_000}
          yStep={1}
        />
      )}
    </WindowModal>
  );
}
