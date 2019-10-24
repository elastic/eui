import React, {
  FunctionComponent,
  MouseEventHandler,
  HTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion, keysOf, PropsOf, Omit } from '../common';

import { isColorDark, hexToRgb } from '../../services/color';
import { EuiInnerText } from '../inner_text';

import { EuiIcon, IconColor, IconType } from '../icon';

type IconSide = 'left' | 'right';

type WithButtonProps = {
  /**
   * Will apply an onclick to the badge itself
   */
  onClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * Aria label applied to the iconOnClick button
   */
  onClickAriaLabel: string;
} & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'>;

type WithSpanProps = Omit<HTMLAttributes<HTMLSpanElement>, 'onClick' | 'color'>;

interface WithIconOnClick {
  /**
   * Will apply an onclick to icon within the badge
   */
  iconOnClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * Aria label applied to the iconOnClick button
   */
  iconOnClickAriaLabel: string;
}

export type EuiBadgeProps = {
  /**
   * Accepts any string from our icon library
   */
  iconType?: IconType;

  /**
   * The side of the badge the icon should sit
   */
  iconSide?: IconSide;

  /**
   * Accepts either our palette colors (primary, secondary ..etc) or a hex value `#FFFFFF`, `#000`.
   */
  color?: IconColor;
  /**
   * Will override any color passed through the `color` prop.
   */
  isDisabled?: boolean;

  /**
   * Props passed to the close button.
   */
  closeButtonProps?: Partial<PropsOf<EuiIcon>>;
} & CommonProps &
  ExclusiveUnion<WithIconOnClick, {}> &
  ExclusiveUnion<WithSpanProps, WithButtonProps>;

const colorToClassNameMap: { [color in IconColor]: string } = {
  default: 'euiBadge--default',
  primary: 'euiBadge--primary',
  secondary: 'euiBadge--secondary',
  accent: 'euiBadge--accent',
  warning: 'euiBadge--warning',
  danger: 'euiBadge--danger',
  hollow: 'euiBadge--hollow',
};

export const COLORS = keysOf(colorToClassNameMap);

const iconSideToClassNameMap: { [side in IconSide]: string } = {
  left: 'euiBadge--iconLeft',
  right: 'euiBadge--iconRight',
};

export const ICON_SIDES = keysOf(iconSideToClassNameMap);

export const EuiBadge: FunctionComponent<EuiBadgeProps> = ({
  children,
  color = 'default',
  iconType,
  iconSide = 'left',
  className,
  isDisabled,
  onClick,
  iconOnClick,
  onClickAriaLabel,
  iconOnClickAriaLabel,
  closeButtonProps,
  ...rest
}) => {
  checkValidColor(color);

  let optionalColorClass = null;
  let optionalCustomStyles: object | undefined = undefined;
  let textColor = null;

  if (COLORS.indexOf(color) > -1) {
    optionalColorClass = colorToClassNameMap[color];
  } else {
    if (isColorDark(...hexToRgb(color))) {
      textColor = '#FFFFFF';
    } else {
      textColor = '#000000';
    }

    optionalCustomStyles = { backgroundColor: color, color: textColor };
  }

  const classes = classNames(
    'euiBadge',
    {
      'euiBadge-isClickable': onClick && !iconOnClick,
      'euiBadge-isDisabled': isDisabled,
    },
    iconSideToClassNameMap[iconSide],
    optionalColorClass,
    className
  );

  const closeClassNames = classNames(
    'euiBadge__icon',
    closeButtonProps && closeButtonProps.className
  );

  let optionalIcon: ReactNode = null;
  if (iconType) {
    if (iconOnClick) {
      if (!iconOnClickAriaLabel) {
        console.warn(
          'When passing the iconOnClick props to EuiBadge, you must also provide iconOnClickAriaLabel'
        );
      }
      optionalIcon = (
        <button
          className="euiBadge__iconButton"
          aria-label={iconOnClickAriaLabel}
          disabled={isDisabled}
          title={iconOnClickAriaLabel}
          onClick={iconOnClick}>
          <EuiIcon
            type={iconType}
            size="s"
            {...closeButtonProps}
            className={closeClassNames}
          />
        </button>
      );
    } else {
      optionalIcon = (
        <EuiIcon type={iconType} size="s" className="euiBadge__icon" />
      );
    }
  }

  if (onClick && !onClickAriaLabel) {
    console.warn(
      'When passing onClick to EuiBadge, you must also provide onClickAriaLabel'
    );
  }

  if (onClick && iconOnClick) {
    return (
      <span className={classes} style={optionalCustomStyles}>
        <span className="euiBadge__content">
          <EuiInnerText>
            {(ref, innerText) => (
              <button
                className="euiBadge__childButton"
                disabled={isDisabled}
                aria-label={onClickAriaLabel}
                onClick={onClick}
                ref={ref}
                title={innerText}
                {...rest}>
                {children}
              </button>
            )}
          </EuiInnerText>
          {optionalIcon}
        </span>
      </span>
    );
  } else if (onClick) {
    return (
      <EuiInnerText>
        {(ref, innerText) => (
          <button
            disabled={isDisabled}
            aria-label={onClickAriaLabel}
            className={classes}
            onClick={onClick}
            style={optionalCustomStyles}
            ref={ref}
            title={innerText}
            {...rest}>
            <span className="euiBadge__content">
              <span className="euiBadge__text">{children}</span>
              {optionalIcon}
            </span>
          </button>
        )}
      </EuiInnerText>
    );
  } else {
    return (
      <EuiInnerText>
        {(ref, innerText) => (
          <span
            className={classes}
            style={optionalCustomStyles}
            ref={ref}
            title={innerText}
            {...rest}>
            <span className="euiBadge__content">
              <span className="euiBadge__text">{children}</span>
              {optionalIcon}
            </span>
          </span>
        )}
      </EuiInnerText>
    );
  }
};

function checkValidColor(color: null | IconColor | string) {
  const validHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

  if (color != null && !validHex.test(color) && !COLORS.includes(color)) {
    console.warn(
      'EuiBadge expects a valid color. This can either be a three ' +
        `or six character hex value or one of the following: ${COLORS}`
    );
  }
}
