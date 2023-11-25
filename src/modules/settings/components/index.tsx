import Account from './account/account';
import Bottom from './bottom/bottom';
import Sessions from './sessions/sessions';

function Settings() {
  return (
    <div className=" container-fluid h-full mx-auto w-full">
      <div className="grid grid-cols-12 h-full grid-rows-12 gap-5">
        <div className="col-span-8 row-span-8  ">
          <Account />
        </div>
        <div className="col-span-8 row-span-4 col-start-1 row-start-9 bg-blue-400">
          <Bottom />
        </div>
        <div className="col-span-4 row-span-12 col-start-9 row-start-1 bg-green-500">
          {' '}
          <Sessions />
        </div>
      </div>
    </div>
  );
}

export default Settings;
