/// <reference path="../icon/index.d.ts" />

import { HTMLAttributes, MouseEventHandler } from 'react';

declare module '@elastic/eui' {

  type IconSide = 'left';

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
}
