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
} from 'react';
import classNames from 'classnames';

import { getSecureRelForTarget, useEuiMemoizedStyles } from '../../../services';
import { CommonProps, ExclusiveUnion } from '../../common';
import { EuiToolTip, EuiToolTipProps, ToolTipPositions } from '../../tool_tip';
import { EuiIcon, IconType } from '../../icon';

import { euiBetaBadgeStyles } from './beta_badge.styles';

export const COLORS = ['accent', 'subdued', 'hollow', 'warning'] as const;
export type BetaBadgeColor = (typeof COLORS)[number];

export const SIZES = ['s', 'm'] as const;
export type BetaBadgeSize = (typeof SIZES)[number];

export const ALIGNMENTS = ['baseline', 'middle'] as const;
export type BetaBadgeAlignment = (typeof ALIGNMENTS)[number];

type WithButtonProps = {
  /**
   * Will apply an onclick to the badge itself
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Aria label applied to the onClick button
   */
  onClickAriaLabel?: AriaAttributes['aria-label'];
} & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'>;

type WithAnchorProps = {
  href: string;
  target?: string;
  rel?: string;
} & Omit<HTMLAttributes<HTMLAnchorElement>, 'href' | 'color' | 'onClick'>;

type WithSpanProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'onClick' | 'color' | 'title'
>;

// `label` prop can be a `ReactNode` only if `title` or `tooltipContent` is provided
type LabelAsNode = ExclusiveUnion<
  {
    title: string;
    tooltipContent?: ReactNode;
  },
  {
    tooltipContent: ReactNode;
    title?: string;
  }
> & {
  label: ReactNode;
};

// Must be `type` instead of `interface`
// https://github.com/elastic/eui/issues/6085
type LabelAsString = {
  /**
   * One word label like "Beta" or "Lab"
   */
  label: string;
};

type BadgeProps = {
  /**
   * Supply an icon type if the badge should just be an icon
   */
  iconType?: IconType;

  /**
   * One word label like "Beta" or "Lab"
   */
  label: ReactNode;

  /**
   * Content for the tooltip
   */
  tooltipContent?: ReactNode;

  /**
   * Custom position of the tooltip
   */
  tooltipPosition?: ToolTipPositions;

  /**
   * Passes onto the span wrapping the badge
   */
  anchorProps?: EuiToolTipProps['anchorProps'];

  /**
   * Optional title will be supplied as tooltip title or title attribute
   * otherwise the label will be used
   */
  title?: string;
  /**
   * Accepts accent, subdued, hollow and warning.
   */
  color?: BetaBadgeColor;
  size?: BetaBadgeSize;
  /**
   * Sets the `vertical-align` CSS property
   */
  alignment?: BetaBadgeAlignment;
} & ExclusiveUnion<LabelAsNode, LabelAsString>;

export type EuiBetaBadgeProps = CommonProps &
  ExclusiveUnion<
    ExclusiveUnion<WithButtonProps, WithAnchorProps>,
    WithSpanProps
  > &
  BadgeProps;

export const EuiBetaBadge: FunctionComponent<EuiBetaBadgeProps> = ({
  className,
  label,
  color = 'hollow',
  tooltipContent,
  tooltipPosition = 'top',
  anchorProps,
  title,
  iconType,
  onClick,
  onClickAriaLabel,
  href,
  rel,
  target,
  size = 'm',
  alignment = 'baseline',
  ...rest
}) => {
  const singleLetter = !!(typeof label === 'string' && label.length === 1);
  const isCircular = iconType || singleLetter;

  const classes = classNames('euiBetaBadge', className);

  const styles = useEuiMemoizedStyles(euiBetaBadgeStyles);
  const cssStyles = [
    styles.euiBetaBadge,
    styles[color],
    styles[size],
    styles[alignment],
    isCircular
      ? styles.badgeSizes.circle[size]
      : styles.badgeSizes.default[size],
  ];

  let icon: JSX.Element | undefined;
  if (iconType) {
    icon = (
      <EuiIcon
        css={styles.euiBetaBadge__icon}
        className="euiBetaBadge__icon"
        type={iconType}
        size={size === 'm' ? 'm' : 's'}
        aria-hidden="true"
        color="inherit" // forces the icon to inherit its parent color
      />
    );
  }

  const Element = href ? 'a' : 'button';
  const relObj: {
    href?: string;
    target?: string;
    rel?: string;
    onClick?:
      | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
      | ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void);
  } = {};

  if (href) {
    relObj.href = href;
    relObj.target = target;
    relObj.rel = getSecureRelForTarget({ href, target, rel });
  }
  if (onClick) {
    relObj.onClick = onClick;
  }

  let content;
  if (onClick || href) {
    content = (
      <Element
        aria-label={onClickAriaLabel}
        css={cssStyles}
        className={classes}
        title={typeof label === 'string' ? label : title}
        {...(relObj as HTMLAttributes<HTMLElement>)}
        {...(rest as HTMLAttributes<HTMLElement>)}
      >
        {icon || label}
      </Element>
    );
    if (tooltipContent) {
      return (
        <EuiToolTip
          position={tooltipPosition}
          content={tooltipContent}
          title={title || label}
          anchorProps={anchorProps}
        >
          {content}
        </EuiToolTip>
      );
    } else {
      return <span {...anchorProps}>{content}</span>;
    }
  } else {
    if (tooltipContent) {
      return (
        <EuiToolTip
          position={tooltipPosition}
          content={tooltipContent}
          title={title || label}
          anchorProps={anchorProps}
        >
          <span tabIndex={0} css={cssStyles} className={classes} {...rest}>
            {icon || label}
          </span>
        </EuiToolTip>
      );
    } else {
      const spanTitle = title || label;
      if (spanTitle && typeof spanTitle !== 'string') {
        console.warn(
          `Only string titles are permitted on badges that do not use tooltips. Found: ${typeof spanTitle}`
        );
      }
      return (
        <span {...anchorProps}>
          <span
            className={classes}
            title={spanTitle as string}
            css={cssStyles}
            {...rest}
          >
            {icon || label}
          </span>
        </span>
      );
    }
  }
};
