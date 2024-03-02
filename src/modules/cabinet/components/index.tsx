import Account from './account/account';
import History from './history/history';
import Sessions from './sessions/sessions';

function Settings() {
  return (
    <div className="grid chat-bg-animation-gradient grid-cols-12 grid-rows-6 gap-0 fixed-height">
      <div className="col-span-8 row-span-2 ">
        <Account />
      </div>
      <div className="col-span-8 row-span-4 col-start-1 row-start-3 border-t-1">
        <History />
      </div>
      <div className="col-span-4 row-span-6 col-start-9 row-start-1 border-l-1">
        <Sessions />
      </div>
    </div>
  );
}

export default Settings;
