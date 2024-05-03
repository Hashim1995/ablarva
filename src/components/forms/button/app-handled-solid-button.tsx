import { ButtonProps, Button } from '@nextui-org/react';
import { ReactNode } from 'react';

interface IProps {
  color?:
    | 'default'
    | 'secondary'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger';
  type?: 'button' | 'submit' | 'reset';
  variant?:
    | 'solid'
    | 'bordered'
    | 'light'
    | 'flat'
    | 'faded'
    | 'shadow'
    | 'ghost';
  children: any;
  className?: string;
  buttonProps?: ButtonProps;
  onClick?: () => void;
  onPress?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  startContent?: ReactNode;
  endContent?: ReactNode;
  spinner?: ReactNode;
  spinnerPlacement?: 'start' | 'end';
  fullWidth?: boolean;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  title?: string;
  form?: string;
}
function AppHandledSolidButton({
  color = 'secondary',
  type = 'button',
  children,
  variant,
  buttonProps,
  className,
  onPress,
  onClick,
  isDisabled = false,
  isLoading = false,
  size = 'md',
  isIconOnly = false,
  startContent,
  endContent,
  spinner,
  spinnerPlacement,
  fullWidth,
  radius,
  title,
  form
}: IProps) {
  return (
    <Button
      variant={variant}
      className={`text-white ${className}`}
      color={color}
      type={type}
      {...buttonProps}
      onClick={onClick}
      onPress={onPress}
      isLoading={isLoading}
      isDisabled={isDisabled}
      size={size}
      isIconOnly={isIconOnly}
      startContent={startContent}
      endContent={endContent}
      spinner={spinner}
      spinnerPlacement={spinnerPlacement}
      fullWidth={fullWidth}
      radius={radius}
      title={title}
      form={form}
    >
      {children}
    </Button>
  );
}

export default AppHandledSolidButton;
