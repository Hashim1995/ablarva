import { LayoutLanguage } from '@/models/common';
import { setCurrentLayoutLanguage } from '@/redux/core/core-slice';
import { RootState } from '@/redux/store';
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './login-form';
import RegisterForm from './register-form';

/**
 * Renders the Login component.
 *
 * @returns The rendered Login component.
 */
function Login() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const [isFlipped, setIsFlipped] = useState(false);
  const { currentLayoutLanguage } = useSelector(
    (state: RootState) => state.core
  );

  /**
   * Toggles the flip state of the Login component.
   */
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const currentLanguageFlag = (id: string) => {
    switch (id) {
      case LayoutLanguage?.Azerbaijani:
        return <img width={22} alt="uk flag" src="/flags/az-flag.svg" />;

      case LayoutLanguage?.English:
        return <img width={22} alt="uk flag" src="/flags/en-flag.svg" />;
      case LayoutLanguage?.Russian:
        return <img width={22} alt="uk flag" src="/flags/ru-flag.svg" />;
      default:
        return <img width={22} alt="uk flag" src="/flags/global-flag.svg" />;
    }
  };
  return (
    <div>
      <div className="r">
        <div
          className={`flip-card  flex  items-center   justify-center ${
            isFlipped ? 'flipped' : ''
          }`}
        >
          <div className="flex justify-center items-center flip-card-inner">
            <div className="z-10 flex md:flex-row md:flex-1 justify-center items-center shadow-lg h-full front max remove-scrollbar">
              <LoginForm handleFlip={handleFlip} />
            </div>
            <div className="z-10 flex md:flex-row md:flex-1 justify-center items-center shadow-lg w-[800px] h-full back max remove-scrollbar">
              <RegisterForm handleFlip={handleFlip} />
            </div>
          </div>
        </div>
      </div>
      <div className="top-4 right-4 fixed hidden">
        <Dropdown
          role="menu"
          className=""
          classNames={{
            content: 'min-w-[auto] w-[80px]'
          }}
        >
          <DropdownTrigger>
            <Button size="sm" className="bg-transparent capitalize">
              {currentLanguageFlag(currentLayoutLanguage)}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={currentLayoutLanguage}
            onSelectionChange={(e: any) => {
              dispatch(setCurrentLayoutLanguage(e?.currentKey));
              i18n?.changeLanguage(e?.currentKey);
              window.location.reload();
            }}
          >
            <DropdownItem key={LayoutLanguage?.Azerbaijani}>
              <img width={22} alt="az flag" src="/flags/az-flag.svg" />
            </DropdownItem>
            <DropdownItem key={LayoutLanguage?.English}>
              <img width={22} alt="en flag" src="/flags/en-flag.svg" />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
export default Login;
