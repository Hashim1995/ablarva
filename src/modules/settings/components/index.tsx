import Account from './account/account';
import History from './history/history';
import Sessions from './sessions/sessions';

function Settings() {
  return (
    <div className=" container-fluid h-full mx-auto w-full">
      <div className="grid grid-cols-12 grid-rows-6 gap-5 h-full">
        <div className="rounded-3xl col-span-8 row-span-3 ">
          <Account />
        </div>
        <div className="rounded-3xl col-span-8 row-span-3 col-start-1 row-start-4  ">
          <History />
        </div>
        <div className=" rounded-3xl col-span-4 row-span-6 col-start-9 row-start-1">
          {' '}
          <Sessions />
        </div>
      </div>
    </div>
  );
}

export default Settings;
