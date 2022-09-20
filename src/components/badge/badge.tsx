/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  AriaAttributes,
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  Ref,
  useMemo,
} from 'react';
import classNames from 'classnames';
import chroma from 'chroma-js';
import { CommonProps, ExclusiveUnion, PropsOf } from '../common';
import {
  useEuiTheme,
  UseEuiTheme,
  euiPaletteColorBlindBehindText,
  getSecureRelForTarget,
  isColorDark,
  wcagContrastMin,
} from '../../services';
import { EuiInnerText } from '../inner_text';
import { EuiIcon, IconType } from '../icon';
import { chromaValid, parseColor } from '../color_picker/utils';
import { validateHref } from '../../services/security/href_validator';

import { euiBadgeStyles } from './badge.styles';

export const ICON_SIDES = ['left', 'right'] as const;
type IconSide = typeof ICON_SIDES[number];

export const COLORS = [
  'default',
  'hollow',
  'primary',
  'success',
  'accent',
  'warning',
  'danger',
] as const;
type BadgeColor = typeof COLORS[number];

// The color blind palette has some stricter accessibility needs with regards to
// charts and contrast. We use the euiPaletteColorBlindBehindText variant here since our
// accessibility concerns pertain to foreground (text) and background contrast
const visColors = euiPaletteColorBlindBehindText();

type WithButtonProps = {
  /**
   * Will apply an onclick to the badge itself
   */
  onClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * Aria label applied to the onClick button
   */
  onClickAriaLabel: AriaAttributes['aria-label'];
} & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'>;

type WithAnchorProps = {
  href: string;
  target?: string;
  rel?: string;
} & Omit<HTMLAttributes<HTMLAnchorElement>, 'href' | 'color' | 'onClick'>;

type WithSpanProps = Omit<HTMLAttributes<HTMLSpanElement>, 'onClick' | 'color'>;

interface WithIconOnClick {
  /**
   * Will apply an onclick to icon within the badge
   */
  iconOnClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * Aria label applied to the iconOnClick button
   */
  iconOnClickAriaLabel: AriaAttributes['aria-label'];
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
   * Accepts either our palette colors (primary, success ..etc) or a hex value `#FFFFFF`, `#000`.
   */
  color?: BadgeColor | string;
  /**
   * Will override any color passed through the `color` prop.
   */
  isDisabled?: boolean;

  /**
   * Props passed to the close button.
   */
  closeButtonProps?: Partial<PropsOf<typeof EuiIcon>>;
} & CommonProps &
  ExclusiveUnion<WithIconOnClick, {}> &
  ExclusiveUnion<
    ExclusiveUnion<WithButtonProps, WithAnchorProps>,
    WithSpanProps
  >;

export const EuiBadge: FunctionComponent<EuiBadgeProps> = ({
  children,
  color = 'default',
  iconType,
  iconSide = 'left',
  className,
  isDisabled: _isDisabled,
  onClick,
  iconOnClick,
  onClickAriaLabel,
  iconOnClickAriaLabel,
  closeButtonProps,
  href,
  rel,
  target,
  style,
  ...rest
}) => {
  const euiTheme = useEuiTheme();

  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;

  const optionalCustomStyles = useMemo(() => {
    const colorToHexMap: { [color in BadgeColor]: string } = {
      default: euiTheme.euiTheme.colors.lightShade,
      hollow: '',
      primary: visColors[1],
      success: visColors[0],
      accent: visColors[2],
      warning: visColors[5],
      danger: visColors[9],
    };

    let textColor = null;
    let contrastRatio = null;
    let colorHex = null;

    try {
      // Check if a valid color name was provided
      if (COLORS.includes(color as BadgeColor)) {
        if (color === 'hollow') return style; // hollow uses its own CSS class

        // Get the hex equivalent for the provided color name
        colorHex = colorToHexMap[color as BadgeColor];

        // Set dark or light text color based upon best contrast
        textColor = setTextColor(euiTheme, colorHex);

        return {
          backgroundColor: colorHex,
          color: textColor,
          ...style,
        };
      } else {
        // This is a custom color- let's do our best to ensure that it provides sufficient contrast

        // Set dark or light text color based upon best contrast
        textColor = setTextColor(euiTheme, color);

        // Check the contrast
        contrastRatio = getColorContrast(textColor, color);

        if (contrastRatio < wcagContrastMin) {
          // It's low contrast, so lets show a warning in the console
          console.warn(
            'Warning: ',
            color,
            ' badge has low contrast of ',
            contrastRatio.toFixed(2),
            '. Should be above ',
            wcagContrastMin,
            '.'
          );
        }

        return {
          backgroundColor: color,
          color: textColor,
          ...style,
        };
      }
    } catch (err) {
      handleInvalidColor(color);
    }
  }, [color, style, euiTheme]);

  const styles = euiBadgeStyles(euiTheme);
  const cssStyles = [
    styles.euiBadge,
    (onClick || href) && !iconOnClick && styles.clickable,
    isDisabled && styles.disabled,
    color === 'hollow' && styles.hollow,
  ];
  const textCssStyles = [
    styles.text.euiBadge__text,
    (onClick || href) && !isDisabled && styles.text.clickable,
  ];
  const iconCssStyles = [styles.icon.euiBadge__icon, styles.icon[iconSide]];
  const iconButtonCssStyles = [
    styles.iconButton.euiBadge__iconButton,
    styles.iconButton[iconSide],
  ];

  const classes = classNames('euiBadge', className);

  const closeClassNames = classNames(
    'euiBadge__icon',
    closeButtonProps && closeButtonProps.className
  );

  const Element = href && !isDisabled ? 'a' : 'button';
  const relObj: {
    href?: string;
    target?: string;
    rel?: string;
    onClick?:
      | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
      | ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void);
  } = {};

  if (href && !isDisabled) {
    relObj.href = href;
    relObj.target = target;
    relObj.rel = getSecureRelForTarget({ href, target, rel });
  }
  if (onClick) {
    relObj.onClick = onClick;
  }

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
          type="button"
          className="euiBadge__iconButton"
          css={iconButtonCssStyles}
          aria-label={iconOnClickAriaLabel}
          disabled={isDisabled}
          title={iconOnClickAriaLabel}
          onClick={iconOnClick}
        >
          <EuiIcon
            type={iconType}
            size="s"
            color="inherit" // forces the icon to inherit its parent color
            css={iconCssStyles}
            {...closeButtonProps}
            className={closeClassNames}
          />
        </button>
      );
    } else {
      optionalIcon = (
        <EuiIcon
          type={iconType}
          size={children ? 's' : 'm'}
          className="euiBadge__icon"
          css={iconCssStyles}
          color="inherit" // forces the icon to inherit its parent color
        />
      );
    }
  }

  if (onClick && !onClickAriaLabel) {
    console.warn(
      'When passing onClick to EuiBadge, you must also provide onClickAriaLabel'
    );
  }

  const content = (
    <span className="euiBadge__content" css={styles.euiBadge__content}>
      {iconSide === 'left' && optionalIcon}
      {children && (
        <span className="euiBadge__text" css={textCssStyles}>
          {children}
        </span>
      )}
      {iconSide === 'right' && optionalIcon}
    </span>
  );

  if (iconOnClick) {
    return onClick || href ? (
      <span className={classes} css={cssStyles} style={optionalCustomStyles}>
        <span className="euiBadge__content" css={styles.euiBadge__content}>
          {iconSide === 'left' && optionalIcon}
          <EuiInnerText>
            {(ref, innerText) => (
              <Element
                className="euiBadge__childButton"
                css={styles.euiBadge__childButton}
                disabled={isDisabled}
                aria-label={onClickAriaLabel}
                ref={ref}
                title={innerText}
                {...(relObj as HTMLAttributes<HTMLElement>)}
                {...(rest as HTMLAttributes<HTMLElement>)}
              >
                {children}
              </Element>
            )}
          </EuiInnerText>
          {iconSide === 'right' && optionalIcon}
        </span>
      </span>
    ) : (
      <EuiInnerText>
        {(ref, innerText) => (
          <span
            className={classes}
            css={cssStyles}
            style={optionalCustomStyles}
            ref={ref}
            title={innerText}
            {...rest}
          >
            {content}
          </span>
        )}
      </EuiInnerText>
    );
  } else if (onClick || href) {
    return (
      <EuiInnerText>
        {(ref, innerText) => (
          <Element
            disabled={isDisabled}
            aria-label={onClickAriaLabel}
            className={classes}
            css={cssStyles}
            style={optionalCustomStyles}
            ref={ref as Ref<HTMLButtonElement & HTMLAnchorElement>}
            title={innerText}
            {...(relObj as HTMLAttributes<HTMLElement>)}
            {...(rest as HTMLAttributes<HTMLElement>)}
          >
            {content}
          </Element>
        )}
      </EuiInnerText>
    );
  } else {
    return (
      <EuiInnerText>
        {(ref, innerText) => (
          <span
            className={classes}
            css={cssStyles}
            style={optionalCustomStyles}
            ref={ref}
            title={innerText}
            {...rest}
          >
            {content}
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

function setTextColor({ euiTheme }: UseEuiTheme, bgColor: string) {
  const textColor = isColorDark(...chroma(bgColor).rgb())
    ? euiTheme.colors.ghost
    : euiTheme.colors.ink;

  return textColor;
}

function handleInvalidColor(color: null | BadgeColor | string) {
  const isNamedColor = COLORS.includes(color as BadgeColor);
  const isValidColorString = color && chromaValid(parseColor(color) || '');
  if (!isNamedColor && !isValidColorString) {
    console.warn(
      'EuiBadge expects a valid color. This can either be a three or six ' +
        `character hex value, rgb(a) value, hsv value, hollow, or one of the following: ${COLORS}. ` +
        `Instead got ${color}.`
    );
  }
}
