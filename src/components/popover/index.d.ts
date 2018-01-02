/// <reference path="../common.d.ts" />

declare module '@elastic/eui' {

  import { SFC, ReactNode, DOMAttributes } from 'react';

  /**
   * popover type defs
   *
   * @see './popover.js'
   */

  export type PopoverAnchorPosition = 'upCenter' | 'upLeft' | 'upRight' | 'downCenter' | 'downLeft' | 'downRight' |
    'leftCenter' | 'leftUp' | 'leftDown' | 'rightCenter' | 'rightUp' | 'rightDown';

  interface EuiPopoverProps {
    id: string,
    closePopover: NoArgCallback<void>;
    button: ReactNode,
    withTitle?: boolean,
    isOpen?: boolean,
    ownFocus?: boolean,
    anchorPosition?: PopoverAnchorPosition,
    panelClassName?: string,
    panelPaddingSize?: PanelPaddingSize,
  }

  export type EuiPopover = SFC<
    CommonProps &
    DOMAttributes<HTMLDivElement> &
    EuiPanelProps
    >;

}
