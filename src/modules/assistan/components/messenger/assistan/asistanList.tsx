import { useEffect, useState } from 'react';
import { AssistanService } from '@/services/assistan-services/assistan-services';
import { IAsistanItem } from '@/modules/assistan/types';
import { useSelector } from 'react-redux';
import { Divider } from '@nextui-org/react';
import { RootState } from '@/redux/store';
import AsistanCard from './asistan';

function AsistanCardList() {
  const [assistansList, setAssistansList] = useState<IAsistanItem[]>();
  const { currentAssistanModel } = useSelector(
    (state: RootState) => state?.assistan
  );
  const fetchAssistansList = async () => {
    try {
      const res = await AssistanService.getInstance().fetchAssistansList();
      setAssistansList(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAssistansList();
  }, []);

  return (
    <div>
      <h1 className="text-white text-xl font-semibold text-center remove-scrollbar mb-3">
        Köməkçi
      </h1>
      <Divider className="h-[1px] bg-white mb-3" />
      <div className="overflow-y-auto remove-scrollbar">
        {assistansList?.map((item: IAsistanItem) => (
          <AsistanCard
            currentAssistanModel={currentAssistanModel}
            data={item}
          />
        ))}
      </div>
    </div>
  );
}

export default AsistanCardList;
