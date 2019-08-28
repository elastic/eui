import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  Ref,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import { EuiLoadingSpinner } from '../loading';

import { getSecureRelForTarget } from '../../services';

import { IconType, EuiIcon } from '../icon';

export type ButtonIconSide = 'left' | 'right';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'ghost'
  | 'text';

export type ButtonSize = 's' | 'm';

const colorToClassNameMap: { [color in ButtonColor]: string } = {
  primary: 'euiButton--primary',
  secondary: 'euiButton--secondary',
  warning: 'euiButton--warning',
  danger: 'euiButton--danger',
  ghost: 'euiButton--ghost',
  text: 'euiButton--text',
};

export const COLORS = keysOf(colorToClassNameMap);

const sizeToClassNameMap: { [size in ButtonSize]: string | null } = {
  s: 'euiButton--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

const iconSideToClassNameMap: { [side in ButtonIconSide]: string | null } = {
  left: null,
  right: 'euiButton--iconRight',
};

export const ICON_SIDES = keysOf(iconSideToClassNameMap);

export interface EuiButtonProps extends CommonProps {
  iconType?: IconType;
  iconSide?: ButtonIconSide;
  fill?: boolean;
  color?: ButtonColor;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  contentProps?: HTMLAttributes<HTMLSpanElement>;
  textProps?: HTMLAttributes<HTMLSpanElement>;
}

type EuiButtonPropsForAnchor = EuiButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    buttonRef?: Ref<HTMLAnchorElement>;
  };

type EuiButtonPropsForButton = EuiButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    buttonRef?: Ref<HTMLButtonElement>;
  };

export type Props = ExclusiveUnion<
  EuiButtonPropsForAnchor,
  EuiButtonPropsForButton
>;

export const EuiButton: FunctionComponent<Props> = ({
  children,
  className,
  iconType,
  iconSide = 'left',
  color = 'primary',
  size = 'm',
  fill = false,
  isDisabled,
  isLoading,
  href,
  target,
  rel,
  type = 'button',
  buttonRef,
  contentProps,
  textProps,
  fullWidth,
  ...rest
}) => {
  // If in the loading state, force disabled to true
  isDisabled = isLoading ? true : isDisabled;

  const classes = classNames(
    'euiButton',
    color ? colorToClassNameMap[color] : null,
    size ? sizeToClassNameMap[size] : null,
    iconSide ? iconSideToClassNameMap[iconSide] : null,
    className,
    {
      'euiButton--fill': fill,
      'euiButton--fullWidth': fullWidth,
    }
  );

  const contentClassNames = classNames(
    'euiButton__content',
    contentProps && contentProps.className
  );

  const textClassNames = classNames(
    'euiButton__text',
    textProps && textProps.className
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (isLoading) {
    buttonIcon = <EuiLoadingSpinner className="euiButton__spinner" size="m" />;
  } else if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiButton__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  const innerNode = (
    <span {...contentProps} className={contentClassNames}>
      {buttonIcon}
      <span {...textProps} className={textClassNames}>
        {children}
      </span>
    </span>
  );

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !isDisabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef as Ref<HTMLAnchorElement>}
        {...rest as AnchorHTMLAttributes<HTMLAnchorElement>}>
        {innerNode}
      </a>
    );
  }

  return (
    <button
      disabled={isDisabled}
      className={classes}
      type={type}
      ref={buttonRef as Ref<HTMLButtonElement>}
      {...rest as ButtonHTMLAttributes<HTMLButtonElement>}>
      {innerNode}
    </button>
  );
};
