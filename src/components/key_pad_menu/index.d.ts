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

  export interface EuiKeyPadMenuItemButtonProps extends EuiKeyPadMenuItemCommonProps {
    onClick: (ev: MouseEventHandler<HTMLButtonElement>) => void;
  }

  export interface EuiKeyPadMenuItemProps extends EuiKeyPadMenuItemCommonProps {
    href: string;
  }

  export const EuiKeyPadMenuItemButton: SFC<
    CommonProps & HTMLAttributes<HTMLButtonElement> & EuiKeyPadMenuItemButtonProps
  >;

  export const EuiKeyPadMenuItem: SFC<
    CommonProps & HTMLAttributes<HTMLAnchorElement> & EuiKeyPadMenuItemProps
  >;
}
