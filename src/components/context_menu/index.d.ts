/// <reference path="../common.d.ts" />

import { ReactElement } from 'react';

declare module '@elastic/eui' {

  import { SFC, ButtonHTMLAttributes, DOMAttributes, ReactElement, ReactNode } from 'react';

  /**
   * context menu panel type defs
   *
   * @see './context_menu_panel.js`
   */

  export type EuiContextMenuPanelHeightChangeHandler = (height: number) => void;

  export type EuiContextMenuPanelTransitionType = 'in' | 'out';
  export type EuiContextMenuPanelTransitionDirection = 'next' | 'previous';
  export type EuiContextMenuPanelShowPanelCallback = (currentPanelIndex: number) => void;

  export interface EuiContextMenuPanelProps {
    items?: ReactNode[],
    title?: ReactNode,
    onClose?: NoArgCallback<void>,
    onHeightChange?: EuiContextMenuPanelHeightChangeHandler,
    transitionType?: EuiContextMenuPanelTransitionType,
    transitionDirection?: EuiContextMenuPanelTransitionDirection,
    onTransitionComplete?: NoArgCallback<void>,
    onUseKeyboardToNavigate?: NoArgCallback<void>,
    hasFocus?: boolean,
    showNextPanel?: EuiContextMenuPanelShowPanelCallback,
    showPreviousPanel?: EuiContextMenuPanelShowPanelCallback,
    initialFocusedItemIndex?: number,
  }

  export type EuiContextMenuPanel = SFC<
    CommonProps &
    Omit<DOMAttributes<HTMLDivElement>, 'ref', 'onKeyDown', 'tabIndex', 'onAnimationEnd'> &
    EuiContextMenuPanelProps
    >;


  /**
   * context menu item type defs
   *
   * @see './context_menu_item.js`
   */

  export type EuiContextMenuItemIcon = ReactElement<any> | string;

  export interface EuiContextMenuItemProps {
    icon?: EuiContextMenuItemIcon,
    hasPanel?: boolean,
    buttonRef?: RefCallback<HTMLButtonElement>
  }

  export type EuiContextMenuItem = SFC<
    CommonProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type', 'ref'> &
    EuiContextMenuItemProps
    >;


  /**
   * context menu type defs
   *
   * @see './context_menu.js`
   */

  export type EuiContextMenuPanelId = string | number;

  export interface EuiContextMenuProps {
    panels?: EuiContextMenuPanel[],
    initialPanelId?: EuiContextMenuPanelId
  }

  export type EuiContextMenu = SFC<
    Omit<DOMAttributes<HTMLDivElement>, 'ref', 'className', 'style'> &
    EuiContextMenuProps>;

}
