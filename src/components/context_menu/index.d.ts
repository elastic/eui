/// <reference path="../common.d.ts" />

import {
  SFC,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode
} from 'react';
import * as React from 'react';

declare module '@elastic/eui' {
  /**
   * context menu panel type defs
   *
   * @see './context_menu_panel.js`
   */

  export type EuiContextMenuPanelHeightChangeHandler = (height: number) => void;
  export type EuiContextMenuPanelTransitionType = 'in' | 'out';
  export type EuiContextMenuPanelTransitionDirection = 'next' | 'previous';
  export type EuiContextMenuPanelShowPanelCallback = (
    currentPanelIndex: number
  ) => void;

  export interface EuiContextMenuPanelProps {
    items?: ReactNode[];
    title?: ReactNode;
    onClose?: NoArgCallback<void>;
    onHeightChange?: EuiContextMenuPanelHeightChangeHandler;
    transitionType?: EuiContextMenuPanelTransitionType;
    transitionDirection?: EuiContextMenuPanelTransitionDirection;
    onTransitionComplete?: NoArgCallback<void>;
    onUseKeyboardToNavigate?: NoArgCallback<void>;
    hasFocus?: boolean;
    showNextPanel?: EuiContextMenuPanelShowPanelCallback;
    showPreviousPanel?: EuiContextMenuPanelShowPanelCallback;
    initialFocusedItemIndex?: number;
  }

  export const EuiContextMenuPanel: SFC<
    CommonProps &
      Omit<
        HTMLAttributes<HTMLDivElement>,
        'onKeyDown' | 'tabIndex' | 'onAnimationEnd'
      > &
      EuiContextMenuPanelProps
  >;

  /**
   * context menu item type defs
   *
   * @see './context_menu_item.js`
   */

  export type EuiContextMenuItemIcon = ReactElement<any> | string;

  export interface EuiContextMenuItemProps {
    icon?: EuiContextMenuItemIcon;
    hasPanel?: boolean;
    buttonRef?: RefCallback<HTMLButtonElement>;
  }

  export const EuiContextMenuItem: SFC<
    CommonProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
      EuiContextMenuItemProps
  >;

  /**
   * context menu type defs
   *
   * @see './context_menu.js`
   */

  export type EuiContextMenuPanelId = string | number;

  export type EuiContextMenuPanelItemDescriptor = Omit<
    EuiContextMenuItemProps,
    'hasPanel'
  > & {
    name: string;
    panel?: EuiContextMenuPanelId;
  };

  interface EuiContextMenuPanelDescriptor {
    id: EuiContextMenuPanelId;
    title: string;
    items?: EuiContextMenuPanelItemDescriptor[];
    content?: React.ReactNode;
  }

  export interface EuiContextMenuProps {
    panels?: EuiContextMenuPanelDescriptor[];
    initialPanelId?: EuiContextMenuPanelId;
  }

  export const EuiContextMenu: SFC<
    Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'> &
      EuiContextMenuProps
  >;
}
