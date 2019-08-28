import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  MouseEventHandler,
  Ref,
} from 'react';
import classNames from 'classnames';

import { getSecureRelForTarget } from '../../../services';
import { CommonProps, ExclusiveUnion, keysOf } from '../../common';

import { IconType, IconSize, EuiIcon } from '../../icon';

import { ButtonSize } from '../button';

export type ButtonIconColor =
  | 'danger'
  | 'disabled'
  | 'ghost'
  | 'primary'
  | 'subdued'
  | 'success'
  | 'text'
  | 'warning';

export interface EuiButtonIconProps extends CommonProps {
  iconType?: IconType;
  color?: ButtonIconColor;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  isDisabled?: boolean;
  size?: ButtonSize;
  iconSize?: IconSize;
}

type EuiButtonIconPropsForAnchor = EuiButtonIconProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    buttonRef?: Ref<HTMLAnchorElement>;
  };

export type EuiButtonIconPropsForButton = EuiButtonIconProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    buttonRef?: Ref<HTMLButtonElement>;
  };

type Props = ExclusiveUnion<
  EuiButtonIconPropsForAnchor,
  EuiButtonIconPropsForButton
>;

const colorToClassNameMap: { [color in ButtonIconColor]: string } = {
  danger: 'euiButtonIcon--danger',
  disabled: 'euiButtonIcon--disabled',
  ghost: 'euiButtonIcon--ghost',
  primary: 'euiButtonIcon--primary',
  subdued: 'euiButtonIcon--subdued',
  success: 'euiButtonIcon--success',
  text: 'euiButtonIcon--text',
  warning: 'euiButtonIcon--warning',
};

export const COLORS = keysOf(colorToClassNameMap);

export const EuiButtonIcon: FunctionComponent<Props> = ({
  className,
  iconType,
  iconSize = 'm',
  color = 'primary',
  isDisabled,
  href,
  type = 'button',
  target,
  rel,
  buttonRef,
  ...rest
}) => {
  if (!rest['aria-label'] && !rest['aria-labelledby']) {
    console.warn(
      `EuiButtonIcon requires aria-label or aria-labelledby to be specified because icon-only
      buttons are screen-reader-inaccessible without them.`
    );
  }
  const classes = classNames(
    'euiButtonIcon',
    colorToClassNameMap[color],
    className
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiButtonIcon__icon"
        type={iconType}
        size={iconSize}
        aria-hidden="true"
      />
    );
  }

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
        {buttonIcon}
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
      {buttonIcon}
    </button>
  );
};
