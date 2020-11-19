/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  FunctionComponent,
  ReactNode,
  HTMLAttributes,
  Ref,
} from 'react';
import classNames from 'classnames';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
} from '../common';

import { EuiBetaBadge } from '../badge/beta_badge';

import { getSecureRelForTarget } from '../../services';

import { IconType } from '../icon';

const renderContent = (
  children: ReactNode,
  label: ReactNode,
  betaBadgeLabel?: ReactNode,
  betaBadgeTooltipContent?: ReactNode,
  betaBadgeIconType?: IconType
) => (
  <span className="euiKeyPadMenuItem__inner">
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

    <span className="euiKeyPadMenuItem__icon">{children}</span>

    <p className="euiKeyPadMenuItem__label">{label}</p>
  </span>
);

interface EuiKeyPadMenuItemCommonProps {
  /**
   * Pass an EuiIcon, preferrably `size="l"`
   */
  children: ReactNode;
  isDisabled?: boolean;
  /**
   * Indicate if an item is the current one.
   * Be sure to use `true` AND `false` when acting as a toggle.
   */
  isSelected?: boolean;
  /**
   * The text to display beneath the icon
   */
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
  rel?: string;
}

type EuiKeyPadMenuItemPropsForAnchor = PropsForAnchor<
  EuiKeyPadMenuItemCommonProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

type EuiKeyPadMenuItemPropsForButton = PropsForButton<
  EuiKeyPadMenuItemCommonProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

export type EuiKeyPadMenuItemProps = CommonProps &
  ExclusiveUnion<
    EuiKeyPadMenuItemPropsForAnchor,
    EuiKeyPadMenuItemPropsForButton
  >;

export const EuiKeyPadMenuItem: FunctionComponent<EuiKeyPadMenuItemProps> = ({
  isDisabled,
  isSelected,
  label,
  children,
  className,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeIconType,
  href,
  rel,
  target,
  buttonRef,
  ...rest
}) => {
  const classes = classNames(
    'euiKeyPadMenuItem',
    {
      'euiKeyPadMenuItem--hasBetaBadge': betaBadgeLabel,
    },
    className
  );

  const Element = href && !isDisabled ? 'a' : 'button';
  const relObj: {
    disabled?: boolean;
    type?: string;
    href?: string;
    rel?: string;
    target?: string;
    'aria-pressed'?: boolean;
    'aria-current'?: boolean;
  } = {};

  if (href && !isDisabled) {
    relObj.href = href;
    relObj.rel = getSecureRelForTarget({ href, target, rel });
    relObj.target = target;
    relObj['aria-current'] = isSelected ? isSelected : undefined;
  } else {
    relObj.disabled = isDisabled;
    relObj.type = 'button';
    relObj['aria-pressed'] = isSelected;
  }

  return (
    <Element
      className={classes}
      {...(relObj as HTMLAttributes<HTMLElement>)}
      {...(rest as HTMLAttributes<HTMLElement>)}
      // ref={buttonRef} HELP!
    >
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
