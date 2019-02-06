import { IconType } from '../icon'
/// <reference path="../tool_tip/index.d.ts" />

import { HTMLAttributes, MouseEventHandler, SFC, ReactNode } from 'react';
import { CommonProps } from '../common';

declare module '@elastic/eui' {

  type IconSide = 'left' | 'right';

  export interface EuiBadgeProps {
    iconType?: IconType;
    iconSide?: IconSide;
    iconOnClick?: MouseEventHandler<HTMLButtonElement>;
    iconOnClickAriaLabel?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    onClickAriaLabel?: string;
    color?: string;
    closeButtonProps?: object;
  }

  export const EuiBadge: SFC<
    CommonProps & HTMLAttributes<HTMLSpanElement> & HTMLAttributes<HTMLButtonElement> & EuiBadgeProps
  >;

  export interface EuiBetaBadgeProps {
    iconType?: IconType;
    label: ReactNode;
    tooltipContent?: ReactNode;
    tooltipPosition?: ToolTipPositions;
    title?: string;
  }

  export const EuiBetaBadge: SFC<
    CommonProps & HTMLAttributes<HTMLSpanElement> & EuiBetaBadgeProps
  >;
}
