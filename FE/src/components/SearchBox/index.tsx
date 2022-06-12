import CalendarArea from '@/components/SearchBox/CalendarArea';
import PeopleArea from '@/components/SearchBox/PeopleArea';
import PriceArea from '@/components/SearchBox/PriceArea';

import * as S from './style';

const SEACH_BOX_MODAL_ID = 'seachBox-Modal';

export default function SearchBox() {
  return (
    <S.Container>
      <CalendarArea wrapperId={SEACH_BOX_MODAL_ID} />
      <PriceArea wrapperId={SEACH_BOX_MODAL_ID} />
      <PeopleArea />
    </S.Container>
  );
}
