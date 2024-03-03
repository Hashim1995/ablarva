import { IAsistanCard } from '@/modules/chat/types';
import { Divider } from '@nextui-org/react';
import AsistanCard from './asistan';
import { asistansList } from '../../../../../assets/dummy';

function AsistanCardList({ activeId }: { activeId: number }) {
  return (
    <div>
      <h1 className="text-white text-[1.2rem] sm:text-[1.6rem] xl:text-[2.2rem] font-semibold text-center mb-3">
        Köməkçi
      </h1>
      <Divider className="h-[1px] bg-white mb-3" />
      <div className="overflow-y-auto">
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
    </div>
  );
}

export default AsistanCardList;
