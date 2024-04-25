import Account from './account/account';
import Sessions from './sessions/sessions';

function Settings() {
  return (
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        <Account />
        <Sessions />
      </div>
    </div>
  );
}

export default Settings;
