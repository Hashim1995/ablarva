/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import './style.scss';

/**
 * A responsive drawer component with customizable directions, overlay settings, and animations.
 * The drawer can slide in from any direction and has options to control the background overlay
 * opacity, size, and z-index. The background scrolling can also be locked while the drawer is open.
 *
 * @summary A fully customizable sliding drawer component.
 * @module AppHandledDrawer
 * @exports AppHandledDrawer
 * @example
 * // Example usage:
 * <AppHandledDrawer
 *   open={true}
 *   direction="left"
 *   onClose={() => console.log('Drawer closed')}
 *   size={300}
 *   duration={400}
 *   lockBackgroundScroll={true}
 *   overlayOpacity={0.5}
 * >
 *   <p>Drawer Content</p>
 * </AppHandledDrawer>
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.open - Determines if the drawer is open or closed.
 * @param {VoidFunction} [props.onClose] - Function called when the drawer closes.
 * @param {'left' | 'right' | 'top' | 'bottom'} props.direction - Direction from which the drawer slides in.
 * @param {boolean} [props.lockBackgroundScroll=false] - If `true`, prevents background scrolling when the drawer is open.
 * @param {React.ReactNode} [props.children] - Content to be displayed inside the drawer.
 * @param {number} [props.duration=500] - Transition duration in milliseconds.
 * @param {number} [props.overlayOpacity=0.4] - Opacity of the background overlay.
 * @param {string} [props.overlayColor='#000'] - Background color of the overlay.
 * @param {boolean} [props.enableOverlay=true] - Enables or disables the background overlay.
 * @param {CSSProperties} [props.style] - Custom styles for the drawer.
 * @param {number} [props.zIndex=100] - The base z-index value for the drawer.
 * @param {number | string} [props.size=250] - Width/height of the drawer based on direction.
 * @param {string} [props.className] - Additional class names for the drawer container.
 * @param {string} [props.customIdSuffix] - Custom suffix for unique element IDs.
 * @param {string} [props.overlayClassName] - Additional class names for the background overlay.
 * @returns {JSX.Element} The drawer component.
 */

type IDirection = 'left' | 'right' | 'top' | 'bottom';

type Props = {
  open: boolean;
  onClose?: VoidFunction;
  direction: IDirection;
  lockBackgroundScroll?: boolean;
  children?: React.ReactNode;
  duration?: number;
  overlayOpacity?: number;
  overlayColor?: String;
  enableOverlay?: boolean;
  style?: CSSProperties;
  zIndex?: number;
  size?: number | string;
  className?: string;
  customIdSuffix?: string;
  overlayClassName?: string;
};

type DirectionStyle = Pick<
  CSSProperties,
  'top' | 'left' | 'right' | 'bottom' | 'width' | 'height' | 'transform'
>;
const getDirectionStyle = (
  dir: IDirection,
  size?: number | string
): DirectionStyle => {
  const directionStyle: Record<IDirection, DirectionStyle> = {
    left: {
      top: 0,
      left: 0,
      transform: 'translate3d(-100%, 0, 0)',
      width: size,
      height: '100vh'
    },
    right: {
      top: 0,
      right: 0,
      transform: 'translate3d(100%, 0, 0)',
      width: size,
      height: '100vh'
    },
    bottom: {
      left: 0,
      right: 0,
      bottom: 0,
      transform: 'translate3d(0, 100%, 0)',
      width: '100%',
      height: size
    },
    top: {
      left: 0,
      right: 0,
      top: 0,
      transform: 'translate3d(0, -100%, 0)',
      width: '100%',
      height: size
    }
  };
  return directionStyle[dir];
};

function AppHandledDrawer(props: Props) {
  const {
    open,
    onClose = () => {},
    children,
    style,
    enableOverlay = true,
    overlayColor = '#000',
    overlayOpacity = 0.4,
    zIndex = 100,
    duration = 500,
    direction,
    size = 250,
    className,
    customIdSuffix,
    lockBackgroundScroll = false,
    overlayClassName = ''
  } = props;

  const bodyRef = useRef<HTMLBodyElement | null>(null);

  useEffect(() => {
    const updatePageScroll = () => {
      bodyRef.current = window.document.querySelector('body');
      if (bodyRef.current && lockBackgroundScroll) {
        bodyRef.current.style.overflow = open ? 'hidden' : '';
      }
    };
    updatePageScroll();
  }, [open]);

  const idSuffix = useMemo(
    () => customIdSuffix || (Math.random() + 1).toString(36).substring(7),
    [customIdSuffix]
  );

  const overlayStyles: CSSProperties = {
    backgroundColor: overlayColor.toString(),
    opacity: overlayOpacity,
    zIndex
  };

  const drawerStyles: CSSProperties = {
    zIndex: zIndex + 1,
    transitionDuration: `${duration}ms`,
    ...getDirectionStyle(direction, size),
    ...style
  };

  return (
    <div id={`EZDrawer${idSuffix}`} className="EZDrawer">
      <input
        type="checkbox"
        id={`EZDrawer__checkbox${idSuffix}`}
        className="EZDrawer__checkbox"
        onChange={onClose}
        checked={open}
      />
      <nav
        role="navigation"
        id={`EZDrawer__container${idSuffix}`}
        style={drawerStyles}
        className={`EZDrawer__container ${className}`}
      >
        {children}
      </nav>
      {enableOverlay && (
        <label
          htmlFor={`EZDrawer__checkbox${idSuffix}`}
          id={`EZDrawer__overlay${idSuffix}`}
          className={`EZDrawer__overlay ${overlayClassName}`}
          style={overlayStyles}
        />
      )}
    </div>
  );
}

export default AppHandledDrawer;
