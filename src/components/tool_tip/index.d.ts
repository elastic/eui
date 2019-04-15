export { EuiToolTipPopover } from './tool_tip_popover';
import { ReactElement, ReactNode, FunctionComponent } from 'react';
import { EuiIcon } from '../icon';
import { Omit, PropsOf } from '../common';

declare module '@elastic/eui' {
  export type ToolTipPositions =
    | 'top'
    | 'right'
    | 'bottom'
    | 'left';

  export type ToolTipDelay =
    | 'regular'
    | 'long';

  export interface EuiToolTipProps {
    anchorClassName?: string;
    children: ReactElement<any>;
    className?: string;
    content?: ReactNode;
    delay?: ToolTipDelay;
    title?: ReactNode;
    id?: string;
    position?: ToolTipPositions;
  }
  export const EuiToolTip: FunctionComponent<EuiToolTipProps>;

  export interface EuiIconTipProps {
    color?: string;
    type?: string;
    size?: string;
    'aria-label'?: string;
    iconProps?: PropsOf<typeof EuiIcon>;
  }
  export const EuiIconTip: FunctionComponent<Omit<EuiToolTipProps, 'children'> & EuiIconTipProps>;
}
