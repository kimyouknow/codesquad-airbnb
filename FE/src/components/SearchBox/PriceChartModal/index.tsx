import { useEffect, useState } from 'react';

import Modal from '@/components/Modal';
import PriceChart from '@/components/SearchBox/PriceChartModal/PriceChart';
import { PriceChartData, PriceChartDataProps } from '@/data/chartData';

interface CalendarModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function PriceChartModal({ isModalOpen, handleOpenModal }: CalendarModalProps) {
  const [chartInfo, setChartInfo] = useState<PriceChartDataProps[] | null>(null);

  // FIXME: msw사용해서 데이터 fetching 요청 해보기
  useEffect(() => {
    setChartInfo(PriceChartData);
  }, []);
  return (
    <Modal isOpen={isModalOpen} onClose={handleOpenModal}>
      {chartInfo && (
        <PriceChart
          chartInfo={chartInfo}
          axis={{ x: 'range', y: 'count' }}
          xStep={10_000}
          yStep={1}
        />
      )}
    </Modal>
  );
}
