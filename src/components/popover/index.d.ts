import { CommonProps, NoArgCallback } from '../common';
/// <reference path="../focus_trap/index.d.ts" />
/// <reference path="../panel/index.d.ts" />

import { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import { EuiPopoverTitleProps } from './popover_title';
import { EuiPopoverFooterProps } from './popover_footer';

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
    initialFocus?: FocusTarget;
    hasArrow?: boolean;
    anchorClassName?: string;
    anchorPosition?: PopoverAnchorPosition;
    panelClassName?: string;
    panelPaddingSize?: PanelPaddingSize;
    repositionOnScroll?: boolean;
    attachToAnchor?: boolean;
  }

  export const EuiPopover: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPopoverProps
  >;

  /**
   * Popover title type defs
   *
   * @see './popover_title.js'
   */
  export const EuiPopoverTitle: EuiPopoverTitleProps;

  /**
   * Popover footer type defs
   *
   * @see './popover_footer.js'
   */
  export const EuiPopoverFooter: EuiPopoverFooterProps;
}
