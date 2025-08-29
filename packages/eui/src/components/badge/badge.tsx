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

import {
  useEuiTheme,
  useEuiMemoizedStyles,
  getSecureRelForTarget,
} from '../../services';
import { validateHref } from '../../services/security/href_validator';
import { CommonProps, ExclusiveUnion, PropsOf } from '../common';
import { EuiInnerText } from '../inner_text';
import { EuiIcon, IconType } from '../icon';
import { getTextColor, getIsValidColor } from './color_utils';
import {
  warnIfContrastBelowMin,
  wcagContrastMin,
} from '../../services/color/contrast';

import { euiBadgeStyles } from './badge.styles';

export const ICON_SIDES = ['left', 'right'] as const;
type IconSide = (typeof ICON_SIDES)[number];

export const COLORS = [
  'default',
  'hollow',
  'primary',
  'accent',
  'neutral',
  'success',
  'warning',
  'risk',
  'danger',
] as const;
type BadgeColor = (typeof COLORS)[number];

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
  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;
  const isNamedColor = COLORS.includes(color as BadgeColor);

  const euiTheme = useEuiTheme();
  const customColorStyles = useMemo(() => {
    // Disabled badges should not have custom colors
    if (isDisabled) return style;
    // Named colors set their styles via Emotion CSS and not inline styles
    if (isNamedColor) return style;

    // Do our best to ensure custom colors provide sufficient contrast
    try {
      // Set dark or light text color based upon best contrast
      const textColor = getTextColor(euiTheme, color);

      // Emit a warning if contrast is below WCAG threshold (centralized util)
      warnIfContrastBelowMin(textColor, color, wcagContrastMin);

      return {
        '--euiBadgeBackgroundColor': color,
        '--euiBadgeTextColor': textColor,
        ...style,
      };
    } catch (err) {
      if (!getIsValidColor(color)) {
        console.warn(
          'EuiBadge expects a valid color. This can either be a three or six ' +
            `character hex value, rgb(a) value, hsv value, hollow, or one of the following: ${COLORS}. ` +
            `Instead got ${color}.`
        );
      }
    }
  }, [color, isNamedColor, isDisabled, style, euiTheme]);

  const styles = useEuiMemoizedStyles(euiBadgeStyles);
  const cssStyles = [
    styles.euiBadge,
    ...(isDisabled
      ? [styles.disabled]
      : [
          isNamedColor && styles[color as BadgeColor],
          !iconOnClick && (onClick || href) && styles.clickable,
        ]),
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
    closeButtonProps?.className
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
            {...closeButtonProps}
            className={closeClassNames}
            css={[...iconCssStyles, closeButtonProps?.css]}
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
      <span className={classes} css={cssStyles} style={customColorStyles}>
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
            style={customColorStyles}
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
            style={customColorStyles}
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
            style={customColorStyles}
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
