/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  AriaAttributes,
  Fragment,
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion, keysOf } from '../../common';

import { getSecureRelForTarget } from '../../../services';

import { EuiToolTip, ToolTipPositions } from '../../tool_tip';

import { EuiIcon, IconType } from '../../icon';

const colorToClassMap = {
  accent: 'euiBetaBadge--accent',
  subdued: 'euiBetaBadge--subdued',
  hollow: 'euiBetaBadge--hollow',
};

export const COLORS: BetaBadgeColor[] = keysOf(colorToClassMap);
export type BetaBadgeColor = keyof typeof colorToClassMap;

export type BetaBadgeSize = 's' | 'm';

export const sizeToClassMap: { [size in BetaBadgeSize]: string | null } = {
  s: 'euiBetaBadge--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassMap);

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

interface LabelAsString {
  /**
   * One word label like "Beta" or "Lab"
   */
  label: string;
}

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
   * Optional title will be supplied as tooltip title or title attribute
   * otherwise the label will be used
   */
  title?: string;
  /**
   * Accepts accent, subdued and hollow.
   */
  color?: BetaBadgeColor;
  size?: BetaBadgeSize;
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
  title,
  iconType,
  onClick,
  onClickAriaLabel,
  href,
  rel,
  target,
  size = 'm',
  ...rest
}) => {
  let singleLetter = false;
  if (typeof label === 'string' && label.length === 1) {
    singleLetter = true;
  }

  const classes = classNames(
    'euiBetaBadge',
    {
      'euiBetaBadge--iconOnly': iconType,
      'euiBetaBadge--singleLetter': singleLetter,
      'euiBetaBadge-isClickable': onClick || href,
    },
    colorToClassMap[color],
    sizeToClassMap[size],
    className
  );

  let icon: JSX.Element | undefined;
  if (iconType) {
    icon = (
      <EuiIcon
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
        >
          <Fragment>{content}</Fragment>
        </EuiToolTip>
      );
    } else {
      return <Fragment>{content}</Fragment>;
    }
  } else {
    if (tooltipContent) {
      return (
        <EuiToolTip
          position={tooltipPosition}
          content={tooltipContent}
          title={title || label}
        >
          <span tabIndex={0} className={classes} {...rest}>
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
        <span className={classes} title={spanTitle as string} {...rest}>
          {icon || label}
        </span>
      );
    }
  }
};
