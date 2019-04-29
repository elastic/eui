import {
  EuiGlobalToastListItemProps as ToastListItemProps,
  EuiGlobalToastListItem as ToastListItem,
} from './global_toast_list_item';
import { CommonProps } from '../common';
import { IconType } from '../icon';

import {
  Component,
  FunctionComponent,
  HTMLAttributes,
  ReactChild,
} from 'react';

declare module '@elastic/eui' {
  /**
   * EuiToast type def
   *
   * @see './toast.js'
   */
  export interface EuiToastProps
    extends CommonProps,
      HTMLAttributes<HTMLDivElement> {
    title?: string,
    color?: 'primary' | 'success' | 'warning' | 'danger',
    iconType?: IconType,
    onClose?: () => void,
  }

  export const EuiToast: FunctionComponent<EuiToastProps>;
  export interface EuiGlobalToastListItemProps extends ToastListItemProps {}
  export const EuiGlobalToastListItem: typeof ToastListItem;

  /**
   * EuiGlobalToastList type def
   *
   * @see './global_toast_list.js'
   */
  export interface Toast extends EuiToastProps {
    id: string;
    text?: ReactChild;
    toastLifeTimeMs?: number;
  }

  export interface EuiGlobalToastListProps {
    toasts?: Toast[];
    dismissToast: (this: EuiGlobalToastList, toast: Toast) => void;
    toastLifeTimeMs: number;
  }

  export class EuiGlobalToastList extends Component<EuiGlobalToastListProps> {
    scheduleAllToastsForDismissal(): void;
    scheduleToastForDismissal(toast: Toast): void;
    dismissToast(toast: Toast): void;
  }
}
