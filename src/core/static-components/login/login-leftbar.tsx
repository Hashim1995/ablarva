import { useDisclosure } from '@nextui-org/react';
import { BsRobot } from 'react-icons/bs';
import TermsConditionsModal from './terms-conditions';

function LoginLeftBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="my-3 text-4xl font-bold tracking-wider flex items-center justify-center">
        <BsRobot className="animate-pulse w-[50px] h-[50px]	md:w-[68px] md:h-[68px]" />
      </div>
      <p className="mt-3 text-sm font-normal text-center text-white md:mt-0">
        Xoş gəlmisiniz! Bizim Suni İntelekt startapımız AIZade sizin gündəlik
        həyatınızı asanlaşdırmaq üçün buradadır. Səmərəli və yenilikçi
        texnologiyamızla, hər bir sualınıza anında cavablar tapa bilərsiniz.
        Bizim platformamızda hər zaman yeniliklər və fərqliliklərə rast
        gələcəksiniz. Giriş edin və AIZade dünyasında səyahətə başlayın!
      </p>

      <p
        aria-hidden
        onClick={onOpen}
        className="mt-3 md:mt-6 underline text-sm text-center text-white cursor-pointer"
      >
        Gizlilik və məxfilik siyasəti
      </p>
      {isOpen && (
        <TermsConditionsModal onOpenChange={onOpenChange} isOpen={isOpen} />
      )}
    </>
  );
}

export default LoginLeftBar;
