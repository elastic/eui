/// <reference path="../icon/index.d.ts" />

import { HTMLAttributes, MouseEventHandler, SFC } from 'react';
import { CommonProps } from '../common';

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
    closeButtonProps?: object;
  }

  export const EuiBadge: SFC<
    CommonProps & HTMLAttributes<HTMLSpanElement> & HTMLAttributes<HTMLButtonElement> & EuiBadgeProps
  >;
}
