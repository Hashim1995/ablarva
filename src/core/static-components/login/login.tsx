import { useState } from 'react';
import LoginForm from './login-form';
import RegisterForm from './register-form';

function Login() {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <div className="r">
        <div
          className={`flip-card  flex  items-center   justify-center ${
            isFlipped ? 'flipped' : ''
          }`}
        >
          <div className="flip-card-inner flex  justify-center items-center">
            <div className="front h-full   z-10 flex flex-col items-center justify-between remove-scrollbar  home-container-without-navbar  gradient-bg shadow-lg max md:flex-row md:flex-1 ">
              <LoginForm handleFlip={handleFlip} />
            </div>
            <div className="back  h-full   z-10 flex flex-col items-center justify-between remove-scrollbar  home-container-without-navbar  gradient-bg shadow-lg max md:flex-row md:flex-1 ">
              <RegisterForm handleFlip={handleFlip} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
