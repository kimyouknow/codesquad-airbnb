import CalendarCaoursel from '@/components/SearchBox/CalendarArea/CalendarCourousel';
import WithModal from '@/hoc/WithModal';
import useToggle from '@/hooks/useToggle';

import * as S from '../style';

interface CalendarAreaProps {
  wrapperId: string;
}

export default function CalendarArea({ wrapperId }: CalendarAreaProps) {
  const [isCalendarModalOpen, handleCalendarModalOpen] = useToggle(false);
  return (
    <>
      <S.CalendarPart onClick={handleCalendarModalOpen}>
        <S.Label>체크인</S.Label>
        <S.Label>체크아웃</S.Label>
      </S.CalendarPart>
      <WithModal
        wrapperId={wrapperId}
        isOpen={isCalendarModalOpen}
        onClose={handleCalendarModalOpen}
        customStyle={S.CalendarModal}
      >
        <CalendarCaoursel initDate={new Date()} itemGap={26} showingCardNum={2} hiddenCardNum={2} />
      </WithModal>
    </>
  );
}
