import { CommonProps, RefCallback, NoArgCallback, Omit } from '../common';

import {
  FunctionComponent,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';

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

  export const EuiContextMenuPanel: FunctionComponent<
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

  export type EuiContextMenuItemIcon = ReactElement<any> | string | HTMLElement;

  export interface EuiContextMenuItemProps extends CommonProps {
    icon?: EuiContextMenuItemIcon;
    hasPanel?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    buttonRef?: RefCallback<HTMLButtonElement>;
    toolTipContent?: ReactNode;
    toolTipTitle?: ReactNode;
    toolTipPosition?: string;
    href?: string;
    target?: string;
    rel?: string;
    children?: ReactNode;
  }

  export const EuiContextMenuItem: FunctionComponent<
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
    title?: string;
    items?: EuiContextMenuPanelItemDescriptor[];
    content?: ReactNode;
    width?: number;
  }

  export type EuiContextMenuProps = CommonProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
      panels?: EuiContextMenuPanelDescriptor[];
      initialPanelId?: EuiContextMenuPanelId;
    };

  export const EuiContextMenu: FunctionComponent<EuiContextMenuProps>;
}
