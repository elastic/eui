/// <reference path="../common.d.ts" />

import { HTMLAttributes, MouseEventHandler, ReactNode, SFC } from 'react';

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
    CommonProps & HTMLAttributes<HTMLButtonElement> & EuiKeyPadMenuItemCommonProps
  >;

  export const EuiKeyPadMenuItem: SFC<
    CommonProps & HTMLAttributes<HTMLAnchorElement> & EuiKeyPadMenuItemCommonProps
  >;
}
