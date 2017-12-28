declare module '@elastic/eui' {

  import * as React from 'react';
  import { ReactElement, ReactNode } from 'react';

  export interface EuiContextMenuPanelProps {
    items?: ReactNode[],
    children?: ReactNode,
    className?: string,
    title?: ReactNode,
    onClose?: () => void,
    onHeightChange?: (height: number) => void,
    transitionType?: 'in' | 'out',
    transitionDirection?: 'next' | 'previous',
    onTransitionComplete?: () => void,
    onUseKeyboardToNavigate?: () => void,
    hasFocus?: boolean,
    showNextPanel?: (currentPanelIndex: number) => void,
    showPreviousPanel?: (currentPanelIndex: number) => void,
    initialFocusedItemIndex?: number,
  }
  export class EuiContextMenuPanel extends React.Component<EuiContextMenuPanelProps, {}> {}

  export interface EuiContextMenuItemProps {
    children?: ReactNode,
    className?: string,
    icon?: ReactElement<any> | string,
    onClick?: () => void,
    hasPanel?: boolean,
    buttonRef?: (button: HTMLButtonElement) => void,
    disabled?: boolean,
  }
  export class EuiContextMenuItem extends React.Component<EuiContextMenuItemProps, {}> {}


  export interface EuiContextMenuProps {
    className?: string,
    panels?: EuiContextMenuPanel[],
    initialPanelId?: string | number
  }
  export class EuiContextMenu extends React.Component<EuiContextMenuProps, {}> {}


}
