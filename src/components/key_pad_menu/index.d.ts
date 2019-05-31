import { CommonProps } from '../common';
import { IconType } from '../icon';

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  FunctionComponent,
} from 'react';

declare module '@elastic/eui' {
  export const EuiKeyPadMenu: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement>
  >;

  interface EuiKeyPadMenuItemCommonProps {
    label: ReactNode;
    betaBadgeLabel?: string;
    betaBadgeIconType?: IconType;
    betaBadgeTooltipContent?: ReactNode;
  }

  export const EuiKeyPadMenuItemButton: FunctionComponent<
    CommonProps &
      ButtonHTMLAttributes<HTMLButtonElement> &
      EuiKeyPadMenuItemCommonProps
  >;

  export const EuiKeyPadMenuItem: FunctionComponent<
    CommonProps &
      AnchorHTMLAttributes<HTMLAnchorElement> &
      EuiKeyPadMenuItemCommonProps
  >;
}
