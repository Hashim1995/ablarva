import { useState } from 'react';
import ParticlesBackground from '../particles-background';
import LoginForm from './login-form';
import RegisterForm from './register-form';

function Login() {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <div className=" particles min-h-screen ">
        <ParticlesBackground />
        <div
          className={`flip-card  flex h-screen items-center   justify-center ${
            isFlipped ? 'flipped' : ''
          }`}
        >
          <div className="flip-card-inner flex justify-center items-center">
            <div className="front h-full md:h-[700px]  z-10 md:border-1 md:border-white flex flex-col items-center md:items-stretch overflow-hidden md:rounded-xl bg-black shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-sm">
              <LoginForm handleFlip={handleFlip} />
            </div>
            <div className="back h-full md:h-[700px] z-10 md:border-1 md:border-white flex flex-col overflow-hidden md:rounded-xl bg-black shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-sm">
              <RegisterForm handleFlip={handleFlip} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
