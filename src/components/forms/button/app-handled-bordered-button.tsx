import { ButtonProps, Button } from '@nextui-org/react';
import { ReactNode } from 'react';

/**
 * A button component with a bordered variant, offering comprehensive customization and dynamic styling.
 * It integrates the NextUI Button component with additional features and options, like different content slots,
 * control of loading states, and flexible size or variant selection.
 *
 * @summary A customizable bordered button component that enhances NextUI's Button.
 * @author Hashim Hashimli
 * @module AppHandledBorderedButton
 * @exports AppHandledBorderedButton
 * @example
 * // Example usage:
 * <AppHandledBorderedButton
 *   color="primary"
 *   type="submit"
 *   variant="bordered"
 *   size="md"
 *   onClick={() => console.log('Button clicked!')}
 *   fullWidth
 * >
 *   Submit
 * </AppHandledBorderedButton>
 *
 * @param {Object} props - The component properties.
 * @param {'default' | 'secondary' | 'primary' | 'success' | 'warning' | 'danger'} [props.color='secondary'] - Button color variant based on NextUI's predefined styles.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The type attribute of the button element, defining its default behavior.
 * @param {'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost'} [props.variant='bordered'] - The visual style of the button, controlling its appearance.
 * @param {any} props.children - The child elements to be rendered inside the button, typically the button text or icon.
 * @param {string} [props.className] - Additional custom styles for the button, enhancing its appearance beyond the defaults.
 * @param {ButtonProps} [props.buttonProps] - Properties passed directly to the NextUI Button component for advanced customization.
 * @param {Function} [props.onClick] - Callback function triggered when the button is clicked.
 * @param {Function} [props.onPress] - Callback function triggered when the button is pressed.
 * @param {boolean} [props.isLoading=false] - Indicates whether the button should display a loading spinner.
 * @param {boolean} [props.isDisabled=false] - Indicates whether the button is currently disabled.
 * @param {boolean} [props.isIconOnly=false] - If `true`, renders only the icon within the button, typically used for compact icon buttons.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Size of the button, affecting its padding, font size, and overall dimensions.
 * @param {ReactNode} [props.startContent] - Content (like an icon) to render at the start of the button.
 * @param {ReactNode} [props.endContent] - Content (like an icon) to render at the end of the button.
 * @param {ReactNode} [props.spinner] - A custom loading spinner to show when the button is in a loading state.
 * @param {'start' | 'end'} [props.spinnerPlacement] - The placement of the loading spinner relative to the button content.
 * @param {boolean} [props.fullWidth=false] - If `true`, makes the button stretch to fill the full width of its container.
 * @param {'none' | 'sm' | 'md' | 'lg' | 'full'} [props.radius] - The border radius of the button, controlling the roundness of its corners.
 * @param {string} [props.title] - An optional title attribute for the button, useful for accessibility or tooltips.
 * @param {string} [props.form] - The `form` attribute, linking the button to a specific form element if it exists outside the form's DOM tree.
 * @returns {JSX.Element} The customized bordered button component.
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
function AppHandledBorderedButton({
  color = 'secondary',
  type = 'button',
  children,
  variant = 'bordered',
  buttonProps,
  className,
  onClick,
  onPress,
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
      className={`border-1 dark:text-white ${className} ${
        variant === 'solid' ? 'border-secondary' : ''
      }`}
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

export default AppHandledBorderedButton;
