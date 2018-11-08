/// <reference path="../icon/index.d.ts" />
/// <reference path="../tool_tip/index.d.ts" />

import { HTMLAttributes, MouseEventHandler, SFC, ReactNode } from 'react';

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
    closeButtonProps?: Object;
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
    CommonProps & HTMLAttributes<HTMLSpanElement> & HTMLAttributes<HTMLSpanElement> & EuiBetaBadgeProps
  >;

  export interface EuiNotificationBadgeProps {
    iconType?: IconType;
    label: ReactNode;
    tooltipContent?: ReactNode;
    tooltipPosition?: ToolTipPositions;
    title?: string;
  }

  export const EuiNotificationBadge: SFC<
    CommonProps & HTMLAttributes<HTMLSpanElement> & HTMLAttributes<HTMLSpanElement>
  >;
}
