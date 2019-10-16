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
    }) & {
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

type EuiBetaBadgeProps = CommonProps &
  HTMLAttributes<HTMLSpanElement> &
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
      />
    );
  }

  if (tooltipContent) {
    return (
      <EuiToolTip
        position={tooltipPosition}
        content={tooltipContent}
        title={title || label}>
        <span className={classes} {...rest}>
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
