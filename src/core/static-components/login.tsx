/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-new */
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { BsEye, BsRobot, BsEnvelope, BsKey, BsEyeSlash } from 'react-icons/bs';
import { ILogin } from '@/models/user';
import { useLocalStorage } from 'usehooks-ts';
import {
  AuthService,
  ILoginResponse
} from '@/services/auth-services/auth-services';
import ParticlesBackground from './test';

/* eslint-disable jsx-a11y/label-has-associated-control */

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control
  } = useForm<ILogin>({
    mode: 'onChange',
    defaultValues: {}
  });
  const [userToken, setUserToken] = useLocalStorage<any>('userToken', null);

  const onSubmit = async (data: ILogin) => {
    try {
      const res: ILoginResponse = await AuthService.getInstance().login(data);
      setUserToken(res.data.accessToken);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex h-screen particles items-center min-h-screen p-4 lg:justify-center">
        <ParticlesBackground />

        <div className="z-10 border-1 border-white flex flex-col overflow-hidden rounded-xl bg-black shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-black-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <BsRobot className="animate-pulse	" size={68} />
            </div>
            <p className="mt-6 font-normal text-center text-white md:mt-0">
              With necəsən, gəl, öp, qıdığla the power of K-WD, you can now
              focus only on functionaries for your digital products, while
              leaving the UI design on us!
            </p>

            <p className="mt-6 text-sm text-center text-white">
              Read our{' '}
              <a href="/#" className="underline">
                terms
              </a>{' '}
              and{' '}
              <a href="/#" className="underline">
                conditions
              </a>
            </p>
          </div>

          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              Account Login
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-5"
            >
              <div className="flex flex-col space-y-1 gap-2">
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address'
                    }
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="email"
                      placeholder="Enter your Email address"
                      variant="bordered"
                      required
                      value={value}
                      size="sm"
                      onChange={onChange}
                      classNames={{
                        inputWrapper: 'border rounded-md h-10',
                        innerWrapper: 'h-fit',
                        input: ' font-light'
                      }}
                      errorMessage={errors.email?.message || ''}
                      startContent={
                        <BsEnvelope
                          size={16}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      // label="Password"
                      variant="bordered"
                      required
                      errorMessage={errors.password?.message || ''}
                      value={value}
                      size="sm"
                      onChange={onChange}
                      classNames={{
                        inputWrapper: 'border rounded-md h-10',
                        innerWrapper: 'h-fit',
                        input: ' font-light'
                      }}
                      placeholder="Enter your password"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={() => setShowPassword(z => !z)}
                        >
                          {showPassword ? (
                            <BsEye
                              size={16}
                              className="text-2xl text-default-400 pointer-events-none"
                            />
                          ) : (
                            <BsEyeSlash
                              size={16}
                              className="text-2xl text-default-400 pointer-events-none"
                            />
                          )}
                        </button>
                      }
                      type={showPassword ? 'text' : 'password'}
                      startContent={
                        <BsKey
                          size={16}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  {/* <a
                    href="/#"
                    className="text-sm text-black-600 hover:underline focus:text-black-800"
                  >
                    Forgot Password?
                  </a> */}
                </div>
              </div>
              {/* <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-black-200"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-semibold text-gray-500"
                >
                  Remember me
                </label>
              </div> */}
              <div>
                <Button
                  variant="bordered"
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                  className="w-full"
                  type="submit"
                >
                  Log in
                </Button>
              </div>
              <div className="flex flex-col space-y-5">
                <span className="flex items-center justify-center space-x-2">
                  <span className="h-px bg-gray-400 w-14" />
                  <span className="font-normal text-gray-500">
                    or login with
                  </span>
                  <span className="h-px bg-gray-400 w-14" />
                </span>
                <div className="flex flex-col space-y-4">
                  <Button variant="bordered" className="w-full" type="submit">
                    Register
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
