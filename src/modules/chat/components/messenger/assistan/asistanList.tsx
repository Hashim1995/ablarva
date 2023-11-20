import { IAsistanCard } from '@/modules/chat/types';
import AsistanCard from './asistan';
import { asistansList } from '../../../../../assets/dummy';

function AsistanCardList({ activeId }: { activeId: number }) {
  return (
    <div>
      {asistansList?.map((item: IAsistanCard) => (
        <AsistanCard
          key={item.id}
          title={item.title}
          description={item.description}
          img={item.img}
          id={item.id}
          activeId={activeId}
        />
      ))}
    </div>
  );
}

export default AsistanCardList;
