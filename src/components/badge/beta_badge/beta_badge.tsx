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

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';

import { EuiToolTip, ToolTipPositions } from '../../tool_tip';

import { EuiIcon, IconType } from '../../icon';

// `label` prop can be a `ReactNode` only if `title` or `tooltipContent` is provided
type LabelAsNode = (
  | {
      title: string;
      tooltipContent?: ReactNode;
    }
  | {
      tooltipContent: ReactNode;
      title?: string;
    }
) & {
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
} & ExclusiveUnion<LabelAsNode, LabelAsString>;

export type EuiBetaBadgeProps = CommonProps &
  Omit<HTMLAttributes<HTMLSpanElement>, 'title'> &
  BadgeProps;

export const EuiBetaBadge: FunctionComponent<EuiBetaBadgeProps> = ({
  className,
  label,
  tooltipContent,
  tooltipPosition = 'top',
  title,
  iconType,
  ...rest
}) => {
  const classes = classNames(
    'euiBetaBadge',
    {
      'euiBetaBadge--iconOnly': iconType,
    },
    className
  );

  let icon;
  if (iconType) {
    icon = (
      <EuiIcon
        className="euiBetaBadge__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
        color="inherit" // forces the icon to inherit its parent color
      />
    );
  }

  if (tooltipContent) {
    return (
      <EuiToolTip
        position={tooltipPosition}
        content={tooltipContent}
        title={title || label}>
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
      <span
        className={classes}
        title={spanTitle as string | undefined}
        {...rest}>
        {icon || label}
      </span>
    );
  }
};
