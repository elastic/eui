/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  ReactNode,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../common';

import { EuiBetaBadge } from '../badge/beta_badge';

import { getSecureRelForTarget } from '../../services';

import { IconType } from '../icon';
import { validateHref } from '../../services/security/href_validator';

const renderContent = (
  children: ReactNode,
  label: ReactNode,
  betaBadgeLabel?: ReactNode,
  betaBadgeTooltipContent?: ReactNode,
  betaBadgeIconType?: IconType
) => (
  <div className="euiKeyPadMenuItem__inner">
    {betaBadgeLabel && (
      <span className="euiKeyPadMenuItem__betaBadgeWrapper">
        <EuiBetaBadge
          className="euiKeyPadMenuItem__betaBadge"
          label={betaBadgeLabel}
          iconType={betaBadgeIconType}
          tooltipContent={betaBadgeTooltipContent}
        />
      </span>
    )}

    <div className="euiKeyPadMenuItem__icon">{children}</div>

    <p className="euiKeyPadMenuItem__label">{label}</p>
  </div>
);

interface EuiKeyPadMenuItemCommonProps {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  isDisabled?: boolean;
  label: ReactNode;

  /**
   * Add a badge to the card to label it as "Beta" or other non-GA state
   */
  betaBadgeLabel?: string;

  /**
   * Supply an icon type if the badge should just be an icon
   */
  betaBadgeIconType?: IconType;

  /**
   * Add a description to the beta badge (will appear in a tooltip)
   */
  betaBadgeTooltipContent?: ReactNode;
  onClick?: () => void;
  href?: string;
  rel?: string;
}

export type EuiKeyPadMenuItemProps = CommonProps &
  ExclusiveUnion<
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
  > &
  EuiKeyPadMenuItemCommonProps;

export const EuiKeyPadMenuItem: FunctionComponent<EuiKeyPadMenuItemProps> = ({
  isDisabled: _isDisabled,
  label,
  children,
  className,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeIconType,
  href,
  rel,
  target,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;

  const classes = classNames(
    'euiKeyPadMenuItem',
    {
      'euiKeyPadMenuItem--hasBetaBadge': betaBadgeLabel,
    },
    className
  );

  const Element = href && !isDisabled ? 'a' : 'button';
  const relObj: {
    role?: string;
    disabled?: boolean;
    type?: string;
    href?: string;
    rel?: string;
    target?: string;
  } = {};

  if (href && !isDisabled) {
    relObj.href = href;
    relObj.target = target;
    relObj.rel = getSecureRelForTarget({ href, rel, target });
  } else {
    relObj.type = 'button';
    relObj.disabled = isDisabled;
  }

  return (
    <Element
      className={classes}
      {...(relObj as HTMLAttributes<HTMLElement>)}
      {...(rest as HTMLAttributes<HTMLElement>)}>
      {renderContent(
        children,
        label,
        betaBadgeLabel,
        betaBadgeTooltipContent,
        betaBadgeIconType
      )}
    </Element>
  );
};
