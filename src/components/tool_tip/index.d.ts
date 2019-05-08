export { EuiToolTipPopover } from './tool_tip_popover';
import { ReactElement, ReactNode, FunctionComponent } from 'react';
import { EuiIcon, IconType } from '../icon';
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
    type?: IconType;
    size?: string;
    'aria-label'?: string;

    // EuiIconTip's `type` is passed to EuiIcon, so we want to exclude `type` from
    // iconProps; however, due to TS's bivariant function arguments `type` could be
    // passed without any error/feedback so we explicitly set it to `never` type
    iconProps?: Omit<PropsOf<EuiIcon>, 'type'> & { type?: never };
  }

  export const EuiIconTip: FunctionComponent<Omit<EuiToolTipProps, 'children'> & EuiIconTipProps>;
}
