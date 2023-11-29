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
            <div
              style={{
                height: '700px'
              }}
              className="front   z-10 border-1 border-white flex flex-col overflow-hidden rounded-xl bg-black shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-sm"
            >
              <LoginForm handleFlip={handleFlip} />
            </div>
            <div
              style={{
                height: '700px'
              }}
              className="back  z-10 border-1 border-white flex flex-col overflow-hidden rounded-xl bg-black shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-sm"
            >
              <RegisterForm handleFlip={handleFlip} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
