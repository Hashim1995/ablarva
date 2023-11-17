import { ILogin } from '@/models/user';
import {
  AuthService,
  ILoginResponse
} from '@/services/auth-services/auth-services';
import { dictionary } from '@/utils/constants/dictionary';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsEye, BsRobot, BsEnvelope, BsKey, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

interface ILoginFormProps {
  handleFlip: () => void;
}
function LoginForm({ handleFlip }: ILoginFormProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<ILogin>({
    mode: 'onSubmit',
    defaultValues: {}
  });
  // eslint-disable-next-line no-unused-vars
  const [userToken, setUserToken] = useLocalStorage<any>('userToken', null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: ILogin) => {
    try {
      const res: ILoginResponse = await AuthService.getInstance().login(data);
      setUserToken(res.data.accessToken);
      navigate('/chat');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="p-4 py-6 text-white bg-black-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
        <div className="my-3 text-4xl font-bold tracking-wider text-center">
          <BsRobot className="animate-pulse	" size={68} />
        </div>
        <p className="mt-6  text-sm font-normal text-center text-white md:mt-0">
          With necəsən, gəle, öp, qıdığla the power of K-WD, you can now focus
          only on functionaries for your digital products, while leaving the UI
          design on us!
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

      <div className="p-3 bg-white md:flex-1 flex items-center		flex-col	justify-around">
        <h3 className="leading-none text-3xl font-semibold text-gray-700">
          {dictionary.az.login}
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <div className="flex flex-col gap-5  ">
            <Controller
              control={control}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: 'Email xanası məcburidir'
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Düzgün olmayan email adresi'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="email"
                  placeholder="Email adresinizi daxil edin"
                  variant="bordered"
                  required
                  value={value}
                  size="sm"
                  onChange={onChange}
                  className="text-black  w-72"
                  classNames={{
                    inputWrapper: [
                      'relative',
                      'w-full',
                      'inline',
                      'inline-flex',
                      'tap-highlight-transparent',
                      'shadow-sm',
                      'min-h-unit-8',
                      'flex-col',
                      'items-start',
                      'justify-center',
                      'gap-0',
                      'border',
                      ' px-3',
                      'py-1',
                      'rounded-md',
                      ' h-8',
                      'data-[hover=true]:border-gray-400',
                      'group-data-[focus=true]:border-gray-400',
                      'transition-background',
                      '!duration-150 ',
                      'transition-colors',
                      'motion-reduce:transition-none ',
                      'hover:border-red-400',
                      'focus:border-red-400'
                    ],
                    innerWrapper: 'h-fit ',
                    input: ' font-light '
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
                required: {
                  value: true,
                  message: 'Şifrə xanası məcburidir'
                }
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
                  className="text-black w-72"
                  classNames={{
                    inputWrapper: [
                      'relative',
                      'w-full',
                      'inline',
                      'inline-flex',
                      'tap-highlight-transparent',
                      'shadow-sm',
                      'min-h-unit-8',
                      'flex-col',
                      'items-start',
                      'justify-center',
                      'gap-0',
                      'border',
                      ' px-3',
                      'py-1',
                      'rounded-md',
                      ' h-8',
                      'data-[hover=true]:border-gray-400',
                      'group-data-[focus=true]:border-gray-400',
                      'transition-background',
                      '!duration-150 ',
                      'transition-colors',
                      'motion-reduce:transition-none ',
                      'hover:border-red-400',
                      'focus:border-red-400'
                    ],
                    innerWrapper: 'h-fit',
                    input: ' font-light'
                  }}
                  placeholder="Şifrənizi daxil edin"
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
          <Button
            size="sm"
            isLoading={isSubmitting}
            className="w-full  text-white border"
            type="submit"
          >
            {dictionary.az.login}
          </Button>
        </form>
        <div className="flex flex-col space-y-5">
          <span className="flex items-center justify-center ">
            <span className="h-px bg-gray-400 w-10" />
            <span
              aria-hidden
              onClick={handleFlip}
              className="font-normal text-black  text-sm"
            >
              {dictionary.az.or}{' '}
              <span
                className=" text-blue-500   cursor-pointer"
                aria-hidden
                onClick={handleFlip}
              >
                {dictionary.az.register}
              </span>
            </span>
            <span className="h-px bg-gray-400 w-10" />
          </span>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
