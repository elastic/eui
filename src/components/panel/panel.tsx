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
  ButtonHTMLAttributes,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  Ref,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf, ExclusiveUnion } from '../common';
import { EuiBetaBadge } from '../badge/beta_badge';

export const panelPaddingValues = {
  none: 0,
  s: 8,
  m: 16,
  l: 24,
};

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPanel--paddingSmall',
  m: 'euiPanel--paddingMedium',
  l: 'euiPanel--paddingLarge',
};

export const SIZES = keysOf(paddingSizeToClassNameMap);

const borderRadiusToClassNameMap = {
  none: 'euiPanel--borderRadiusNone',
  m: 'euiPanel--borderRadiusMedium',
};

export const BORDER_RADII = keysOf(borderRadiusToClassNameMap);

export const COLORS = [
  'transparent',
  'plain',
  'subdued',
  'accent',
  'primary',
  'success',
  'warning',
  'danger',
] as const;

export type PanelColor = typeof COLORS[number];
export type PanelPaddingSize = typeof SIZES[number];
export type PanelBorderRadius = typeof BORDER_RADII[number];

export interface _EuiPanelProps extends CommonProps {
  /**
   * Adds a medium shadow to the panel;
   * Only works when `color="plain"`
   */
  hasShadow?: boolean;
  /**
   * Adds a slight 1px border on all edges.
   * Only works when `color="plain | transparent"`
   * Default is `undefined` and will default to that theme's panel style
   */
  hasBorder?: boolean;
  /**
   * Padding for all four sides
   */
  paddingSize?: PanelPaddingSize;
  /**
   * Corner border radius
   */
  borderRadius?: PanelBorderRadius;
  /**
   * When true the panel will grow in height to match `EuiFlexItem`
   */
  grow?: boolean;
  panelRef?: Ref<HTMLDivElement>;
  /**
   * Background color of the panel;
   * Usually a lightened form of the brand colors
   */
  color?: PanelColor;
  /**
   * **DEPRECATED: use `EuiCard` instead.**
   * Add a badge to the panel to label it as "Beta" or other non-GA state
   */
  betaBadgeLabel?: string;
  /**
   * **DEPRECATED: use `EuiCard` instead.**
   * Add a description to the beta badge (will appear in a tooltip)
   */
  betaBadgeTooltipContent?: ReactNode;
  /**
   * **DEPRECATED: use `EuiCard` instead.**
   * Optional title will be supplied as tooltip title or title attribute otherwise the label will be used
   */
  betaBadgeTitle?: string;
}

interface Divlike
  extends _EuiPanelProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onClick' | 'color'> {}

interface Buttonlike
  extends _EuiPanelProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {}

export type EuiPanelProps = ExclusiveUnion<Divlike, Buttonlike>;

export const EuiPanel: FunctionComponent<EuiPanelProps> = ({
  children,
  className,
  paddingSize = 'm',
  borderRadius = 'm',
  color = 'plain',
  hasShadow = true,
  hasBorder,
  grow = true,
  panelRef,
  onClick,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeTitle,
  ...rest
}) => {
  // Shadows are only allowed when there's a white background (plain)
  const canHaveShadow = color === 'plain';
  const canHaveBorder = color === 'plain' || color === 'transparent';

  const classes = classNames(
    'euiPanel',
    paddingSizeToClassNameMap[paddingSize],
    borderRadiusToClassNameMap[borderRadius],
    `euiPanel--${color}`,
    {
      // The `no` classes turn off the option for default theme
      // While the `has` classes turn it on for Amsterdam
      'euiPanel--hasShadow': canHaveShadow && hasShadow === true,
      'euiPanel--noShadow': !canHaveShadow || hasShadow === false,
      'euiPanel--hasBorder': canHaveBorder && hasBorder === true,
      'euiPanel--noBorder': !canHaveBorder || hasBorder === false,
      'euiPanel--flexGrowZero': !grow,
      'euiPanel--isClickable': onClick,
      'euiPanel--hasBetaBadge': betaBadgeLabel,
    },
    className
  );

  let optionalBetaBadge;
  if (betaBadgeLabel) {
    optionalBetaBadge = (
      <span className="euiPanel__betaBadgeWrapper">
        <EuiBetaBadge
          label={betaBadgeLabel}
          title={betaBadgeTitle}
          tooltipContent={betaBadgeTooltipContent}
          className="euiPanel__betaBadge"
        />
      </span>
    );
  }

  if (onClick) {
    return (
      <button
        ref={panelRef as Ref<HTMLButtonElement>}
        className={classes}
        onClick={onClick}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {optionalBetaBadge}
        {children}
      </button>
    );
  }

  return (
    <div
      ref={panelRef as Ref<HTMLDivElement>}
      className={classes}
      {...(rest as HTMLAttributes<HTMLDivElement>)}>
      {optionalBetaBadge}
      {children}
    </div>
  );
};
