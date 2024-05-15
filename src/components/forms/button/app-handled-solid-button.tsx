import { ButtonProps, Button } from '@nextui-org/react';
import { ReactNode } from 'react';

/**
 * A customizable solid button component with various visual variants and flexible event handling.
 * It utilizes NextUI's Button component with additional features like content slots, loading states,
 * and size or color selection to create a tailored user experience.
 *
 * @summary A versatile solid button component with NextUI integration and customizable appearance.
 * @author Hashim Hashimli
 * @module AppHandledSolidButton
 * @exports AppHandledSolidButton
 * @example
 * // Example usage:
 * <AppHandledSolidButton
 *   color="primary"
 *   type="submit"
 *   variant="solid"
 *   size="lg"
 *   onClick={() => console.log('Solid button clicked!')}
 * >
 *   Confirm
 * </AppHandledSolidButton>
 *
 * @param {Object} props - The component properties.
 * @param {'default' | 'secondary' | 'primary' | 'success' | 'warning' | 'danger'} [props.color='secondary'] - Button color variant based on NextUI's predefined styles.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The type attribute of the button element, defining its default behavior.
 * @param {'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost'} [props.variant] - The visual style of the button, controlling its appearance.
 * @param {any} props.children - The content to render inside the button, usually text or an icon.
 * @param {string} [props.className] - Additional custom styles for the button, enhancing its appearance beyond the defaults.
 * @param {ButtonProps} [props.buttonProps] - Properties passed directly to the NextUI Button component for further customization.
 * @param {Function} [props.onClick] - Callback function triggered when the button is clicked.
 * @param {Function} [props.onPress] - Callback function triggered when the button is pressed.
 * @param {boolean} [props.isLoading=false] - Indicates whether the button should display a loading spinner.
 * @param {boolean} [props.isDisabled=false] - Indicates whether the button is currently disabled.
 * @param {boolean} [props.isIconOnly=false] - If `true`, renders only an icon within the button.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the button, affecting its dimensions and font size.
 * @param {ReactNode} [props.startContent] - Content (like an icon) to render at the start of the button.
 * @param {ReactNode} [props.endContent] - Content (like an icon) to render at the end of the button.
 * @param {ReactNode} [props.spinner] - A custom loading spinner to show when the button is in a loading state.
 * @param {'start' | 'end'} [props.spinnerPlacement] - The placement of the loading spinner relative to the button content.
 * @param {boolean} [props.fullWidth=false] - If `true`, makes the button stretch to fill the full width of its container.
 * @param {'none' | 'sm' | 'md' | 'lg' | 'full'} [props.radius] - The border radius of the button, controlling the roundness of its corners.
 * @param {string} [props.title] - An optional title attribute for the button, useful for accessibility or tooltips.
 * @param {string} [props.form] - The `form` attribute, linking the button to a specific form element if it exists outside the form's DOM tree.
 * @returns {JSX.Element} The customized solid button component.
 */

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
  // eslint-disable-next-line no-unused-vars
  onClick?: (e?: any) => void;
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
