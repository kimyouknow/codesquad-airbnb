/* eslint-disable prettier/prettier */
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
  const [isSlide, setIsSlide] = useState(false);
  const [transtion, setTransition] = useState('transform 1s linear 0s');

  // TODO : handleClickNextCalendar를 참고하여 이전 달력 클릭 핸들러 구현하기
  const handleClickPreviousCalendar = () => {};

  const divide = months.length - 1;
  const currentMonthOrder = 1;
  const lastMonthOrder = divide - 1;
  const increasedMonth = divide - 2;
  const itemGap = 26;

  const handleClickNextCalendar = () => {
    setActiveMonth(activeMonth + 1);
    const newOrder = (nextCount + 1) % divide;
    const firstMonthOrder = newOrder + 1;
    setNextCount(nextCount === lastMonthOrder ? firstMonthOrder : newOrder);
  };

  useEffect(() => {
    if (nextCount === currentMonthOrder) {
      setTransition('transform 1s linear 0s');
      if (isSlide) {
        // TODO : 12월 넘어가면 1월부터 다시 시작하고 year은 1추가로 수정하기
        setMonths([...months.map(currentMonth => currentMonth + increasedMonth)]);
        setTimeout(function () {
          setNextCount((nextCount + 1) % divide);
        }, 0);
        setTransition('');
      }
      setIsSlide(false);
    } else if (nextCount === lastMonthOrder) {
      setIsSlide(true);
    }
  }, [nextCount, transtion, isSlide]);

  return (
    <WindowModal show={isModalOpen} handleOpenModal={handleOpenModal}>
      <S.CalendarContainer>
        {/* TODO: div태그 styled로 변경 */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* TODO: activeMonth + magic number 수정하기 */}
          <button type="button" onClick={handleClickPreviousCalendar}></button>
          <div style={{ overflow: 'hidden' }}>
            <S.ItemContainer nextCount={nextCount} transtion={transtion} divide={divide}>
              {months.map(currentActiveMonth => (
                <S.Item key={`activeMonth-${currentActiveMonth}`} itemGap={itemGap}>
                  <Calendar activeMonth={currentActiveMonth} activeYear={activeYear} />
                </S.Item>
              ))}
            </S.ItemContainer>
          </div>
          <button type="button" onClick={handleClickNextCalendar}></button>
        </div>
      </S.CalendarContainer>
    </WindowModal>
  );
}
