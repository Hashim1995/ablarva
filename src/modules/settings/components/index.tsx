import Account from './account/account';
import Bottom from './bottom/bottom';
import Sessions from './sessions/sessions';

function Settings() {
  return (
    <div className=" container-fluid h-full mx-auto w-full">
      <div className="grid grid-cols-12 grid-rows-5 gap-5 h-full">
        <div className="rounded-3xl col-span-8 row-span-3 ">
          <Account />
        </div>
        <div className="rounded-3xl col-span-8 col-start-1 row-span-2   bg-blue-400">
          <Bottom />
        </div>
        <div className=" rounded-3xl col-span-4 row-span-5 col-start-9 row-start-1 bg-green-500">
          {' '}
          <Sessions />
        </div>
      </div>
    </div>
  );
}

export default Settings;
