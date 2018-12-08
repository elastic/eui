import { CommonProps } from '../common';
import { IconType } from '../icon';

import { Component, SFC, HTMLAttributes, ReactChild } from 'react';

declare module '@elastic/eui' {
  /**
   * EuiToast type def
   *
   * @see './toast.js'
   */
  export interface EuiToastProps extends CommonProps, HTMLAttributes<HTMLDivElement> {
    title?: string,
    color?: 'primary' | 'success' | 'warning' | 'danger',
    iconType?: IconType,
    onClose?: () => void,
  }

  export const EuiToast: SFC<EuiToastProps>;


  /**
   * EuiGlobalToastListItem type def
   *
   * @see './global_toast_list_item.js'
   */
  export interface EuiGlobalToastListItemProps {
    isDismissed?: boolean;
  }

  export const EuiGlobalToastListItem: SFC<
    EuiGlobalToastListItemProps
  >

  /**
   * EuiGlobalToastList type def
   *
   * @see './global_toast_list.js'
   */
  export interface Toast extends EuiToastProps {
    id: string,
    text?: ReactChild,
  }

  export interface EuiGlobalToastListProps {
    toasts?: Toast[];
    dismissToast: (this: EuiGlobalToastList, toast: Toast) => void;
    toastLifeTimeMs: number
  }

  export class EuiGlobalToastList extends Component<EuiGlobalToastListProps> {
    scheduleAllToastsForDismissal(): void;
    scheduleToastForDismissal(toast: Toast): void;
    dismissToast(toast: Toast): void;
  }
}
