import { CommonProps, NoArgCallback } from '../common';
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
    anchorClassName?: string;
    anchorPosition?: PopoverAnchorPosition;
    panelClassName?: string;
    panelPaddingSize?: PanelPaddingSize;
  }

  export const EuiPopover: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPopoverProps
  >;

  export const EuiPopoverTitle: SFC<
    CommonProps & HTMLAttributes<HTMLDivElement>
  >;
}
