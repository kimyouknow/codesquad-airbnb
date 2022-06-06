import { useEffect, useState } from 'react';

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
  // TODO : 12월 넘어가면 1월부터 다시 시작하고 year은 1추가로 수정하기
  const [months, setMonths] = useState([
    activeMonth - 1,
    activeMonth,
    activeMonth + 1,
    activeMonth + 2,
    activeMonth + 3,
  ]);
  const [nextCount, setNextCount] = useState(1);
  const [isCombackSlide, setIsCombackSlide] = useState(false);
  const [transition, setTransition] = useState('transform 1s linear 0s');

  const divide = months.length - 1;
  const currentMonthOrder = 1;
  const lastMonthOrder = divide - 1;
  const increasedMonth = divide - 2;
  const itemGap = 26;

  const handleClickPreviousCalendar = () => {};

  const handleClickNextCalendar = () => {
    setActiveMonth(activeMonth + 1);
    const newOrder = (nextCount + 1) % divide;
    const firstMonthOrder = newOrder + 1;
    setNextCount(nextCount === lastMonthOrder ? firstMonthOrder : newOrder);
  };

  useEffect(() => {
    // FIXME: useEffect 내부 로직 함수로 분리
    if (nextCount === currentMonthOrder) {
      setTransition('transform 1s linear 0s');
      if (isCombackSlide) {
        // TODO : 12월 넘어가면 1월부터 다시 시작하고 year은 1추가로 수정하기
        setMonths([...months.map(currentMonth => currentMonth + increasedMonth)]);
        setTimeout(function () {
          setNextCount((nextCount + 1) % divide);
        }, 0);
        setTransition('');
      }
      setIsCombackSlide(false);
    } else if (nextCount === lastMonthOrder) {
      setIsCombackSlide(true);
    }
  }, [nextCount, transition, isCombackSlide]);

  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      <S.CalendarContainer>
        {/* TODO: activeMonth + magic number 수정하기 */}
        <button type="button" onClick={handleClickPreviousCalendar}>
          이전달
        </button>
        <S.Wrapper>
          <S.ItemContainer nextCount={nextCount} transition={transition}>
            {months.map(currentActiveMonth => (
              <S.Item key={`activeMonth-${currentActiveMonth}`} itemGap={itemGap}>
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
