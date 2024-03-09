import Account from './account/account';
import Sessions from './sessions/sessions';

function Settings() {
  return (
    <div className="grid grid-cols-12 grid-rows-6  fixed-height">
      <div className="col-span-8 row-span-6  fixed-height">
        <Account />
      </div>
      <div className="col-span-4 row-span-6 col-start-9 ">
        <Sessions />
      </div>
    </div>

    // <div className="grid  grid-cols-12 grid-rows-6 gap-0 fixed-height">
    //   <div className="col-span-8 row-span-2 min-h-[210px] ">
    //     <Account />
    //   </div>
    //   <div className="col-span-8 row-span-4 col-start-1 row-start-3 border-t-2 border-default">
    //     <History />
    //   </div>
    //   <div className="col-span-4 row-span-6 col-start-9 row-start-1 border-l-2  border-default">
    //     <Sessions />
    //   </div>
    // </div>
  );
}

export default Settings;
