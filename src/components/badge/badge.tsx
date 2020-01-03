import React, {
  FunctionComponent,
  MouseEventHandler,
  HTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion, keysOf, PropsOf } from '../common';

import chroma from 'chroma-js';
import { isColorDark, hexToRgb } from '../../services/color';
import { palettes } from '../../services/color/eui_palettes';
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

const colorToHexMap: { [color in IconColor]: string } = {
  default: palettes.euiPaletteMonotones.colors[2],
  primary: palettes.euiPaletteForLightBackground.colors[0],
  secondary: palettes.euiPaletteForLightBackground.colors[1],
  accent: palettes.euiPaletteForLightBackground.colors[4],
  warning: palettes.euiPaletteForLightBackground.colors[2],
  danger: palettes.euiPaletteForLightBackground.colors[3],
};

export const COLORS = keysOf(colorToHexMap);

const colorToClassNameMap: { [color in IconColor]: string } = {
  default: 'euiBadge--default',
  primary: 'euiBadge--primary',
  secondary: 'euiBadge--secondary',
  accent: 'euiBadge--accent',
  warning: 'euiBadge--warning',
  danger: 'euiBadge--danger',
  hollow: 'euiBadge--hollow',
};

export const BUTTONCOLORS = keysOf(colorToClassNameMap);

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
  let customBackgroundColor = null;
  let textColor = null;
  let textColorDarkened = null;
  const wcagContrastBase = 4.5; // WCAG AA contrast level
  let wcagContrast = null;
  const maxLightness = 50; // Subjective cutoff, high lightness loses vibrancy
  let currentLightness = null;
  let colorHex = null;
  const colorInk = palettes.euiPaletteMonotones.colors[6];
  const colorGhost = palettes.euiPaletteMonotones.colors[0];

  if (COLORS.indexOf(color) > -1) {
    if (onClick || iconOnClick) {
      optionalColorClass = colorToClassNameMap[color];
    } else {
      // Map the EUI color name to its hex value from palettes
      colorHex = colorToHexMap[color];

      textColor = chroma(colorHex)
        .darken(2)
        .hex(); // darken text vs background

      currentLightness = chroma(colorHex).lab()[0]; // get LAB Lightness value

      // Use variations of the provided color for both background and text
      // If it's too light, then leave it as-is and use dark text for contrast
      if (currentLightness < maxLightness) {
        // Increase the lightness of the provided color to use as background
        customBackgroundColor = chroma(colorHex)
          .set('lab.l', '*1.5')
          .hex();
      } else {
        // The color is already light, so just leave it as is and use dark text
        customBackgroundColor = colorHex;
        textColor = colorInk;
      }

      optionalCustomStyles = {
        backgroundColor: customBackgroundColor,
        color: textColor,
      };
    }
  } else if (color !== 'hollow') {
    if (isColorDark(...hexToRgb(color))) {
      // If the provided hex color is dark, then use white text for max contrast
      textColor = colorGhost;
    } else {
      // Try to darken the provided color before using all black text
      textColorDarkened = chroma(color)
        .darken(3)
        .hex();

      // Check the contrast
      wcagContrast = getColorContrast(textColorDarkened, color);

      if (wcagContrast < wcagContrastBase) {
        // It's low contrast, so lets go full black and check again
        textColor = colorInk;
        wcagContrast = getColorContrast(textColor, color);
        if (wcagContrast < wcagContrastBase) {
          // Warn that the custom color results in low contrast
          console.warn(
            'Warning: ',
            color,
            'badge has low contrast of ',
            wcagContrast,
            '. Should be above ',
            wcagContrastBase
          );
        }
      } else {
        // Darkening the custom hex provided sufficient contrast, lets use it
        textColor = textColorDarkened;
      }
    }

    optionalCustomStyles = { backgroundColor: color, color: textColor };
  }

  const classes = classNames(
    'euiBadge',
    {
      'euiBadge-isClickable': onClick && !iconOnClick,
      'euiBadge-isDisabled': isDisabled,
      'euiBadge--hollow': color === 'hollow',
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
          onClick={iconOnClick}
          color={color}>
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
                color={color}
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

function getColorContrast(textColor: string, color: string) {
  const contrastValue = chroma.contrast(textColor, color);
  return contrastValue;
}

function checkValidColor(color: null | IconColor | string) {
  const validHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

  if (
    color != null &&
    !validHex.test(color) &&
    !COLORS.includes(color) &&
    color !== 'hollow'
  ) {
    console.warn(
      'EuiBadge expects a valid color. This can either be a three or six ' +
        `character hex value, hollow, or one of the following: ${COLORS}`
    );
  }
}
