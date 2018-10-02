/// <reference path="../common.d.ts" />
/// <reference path="../panel/index.d.ts" />

import { SFC, ReactNode, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * popover type defs
   *
   * @see './popover.js'
   */

  export type PopoverAnchorPosition =
    | 'upCenter'
    | 'upLeft'
    | 'upRight'
    | 'downCenter'
    | 'downLeft'
    | 'downRight'
    | 'leftCenter'
    | 'leftUp'
    | 'leftDown'
    | 'rightCenter'
    | 'rightUp'
    | 'rightDown';

  interface EuiPopoverProps {
    id: string;
    closePopover: NoArgCallback<void>;
    button: ReactNode;
    withTitle?: boolean;
    isOpen?: boolean;
    ownFocus?: boolean;
    hasArrow?: boolean;
    anchorPosition?: PopoverAnchorPosition;
    panelClassName?: string;
    panelPaddingSize?: PanelPaddingSize;
  }

  export const EuiPopover: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPopoverProps
  >;
}
