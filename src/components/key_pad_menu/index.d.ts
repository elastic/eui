import { CommonProps } from '../common';
import { IconType } from '../icon';

import { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode, SFC } from 'react';

declare module '@elastic/eui' {

  export const EuiKeyPadMenu: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement>
  >;

  interface EuiKeyPadMenuItemCommonProps {
    label: ReactNode;
    betaBadgeLabel?: string;
    betaBadgeIconType?: IconType;
    betaBadgeTooltipContent?: ReactNode;
  }

  export const EuiKeyPadMenuItemButton: SFC<
    CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & EuiKeyPadMenuItemCommonProps
  >;

  export const EuiKeyPadMenuItem: SFC<
    CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & EuiKeyPadMenuItemCommonProps
  >;
}
