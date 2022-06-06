import { useState } from 'react';

import Calendar from '@/components/Calendar';

import WindowModal from '../WindowModal';
import * as S from './style';

interface CalendarModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
}

export default function CalendarModal({ isModalOpen, handleOpenModal }: CalendarModalProps) {
  // TODO: date formater util로 분리하기
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const [activeYear, setActiveYear] = useState(year);
  const [activeMonth, setActiveMonth] = useState(month);

  const showingCardNum = 2;
  const HIDDEN_CARD_NUM = 2;
  const initialMonths = Array.from(
    { length: showingCardNum + HIDDEN_CARD_NUM },
    (_, index) => index - 1 + activeMonth,
  );
  // TODO : 12월 넘어가면 1월부터 다시 시작하고 year은 1추가로 수정하기
  const [months, setMonths] = useState(initialMonths);
  const [slideXCount, setSlideXCount] = useState(1);
  const [isRightSliding, setIsRightSliding] = useState(false);
  const INCREASED_MONTH = 1;
  const INCREASED_SLIDE_X_COUNT = 1;
  const INITIAL_SLIDE_X_COUNT = 1;
  const itemGap = 26;

  const handleClickPreviousCalendar = () => {};

  const handleClickNextCalendar = () => {
    setIsRightSliding(true);
    setSlideXCount(slideXCount + INCREASED_SLIDE_X_COUNT);
  };

  const handleTransitionEnd = () => {
    setActiveMonth(activeMonth + INCREASED_MONTH);
    setSlideXCount(INITIAL_SLIDE_X_COUNT);
    setMonths(months.map(currentMonth => currentMonth + INCREASED_MONTH));
    setIsRightSliding(false);
  };

  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      <S.CalendarContainer>
        {/* TODO: activeMonth + magic number 수정하기 */}
        <button type="button" onClick={handleClickPreviousCalendar}>
          이전달
        </button>
        <S.Wrapper>
          <S.ItemContainer
            slideXCount={slideXCount}
            isRightSliding={isRightSliding}
            onTransitionEnd={handleTransitionEnd}
            showingCardNum={showingCardNum}
          >
            {months.map(currentActiveMonth => (
              <S.Item
                key={`activeMonth-${currentActiveMonth}`}
                itemGap={itemGap}
                showingCardNum={showingCardNum}
              >
                <Calendar activeMonth={currentActiveMonth} activeYear={activeYear} />
              </S.Item>
            ))}
          </S.ItemContainer>
        </S.Wrapper>
        <button type="button" onClick={handleClickNextCalendar}>
          다음달
        </button>
      </S.CalendarContainer>
    </WindowModal>
  );
}
