import { ReactElement, ReactNode, SFC } from 'react';

declare module '@elastic/eui' {
  export type ToolTipPositions =
    | 'top'
    | 'right'
    | 'bottom'
    | 'left';

  export type ToolTipDelay =
    | 'regular'
    | 'long';

  export interface ToolTipProps {
    className?: string;
    content: ReactNode;
    delay?: ToolTipDelay;
    title?: ReactNode;
    id?: string;
    position?: ToolTipPositions;
  }

  export interface EuiToolTipProps {
    children: ReactElement<any>;
  }
  export const EuiToolTip: SFC<ToolTipProps & EuiToolTipProps>;

  export interface EuiIconTipProps {
    color?: string;
    type?: string;
    size?: string;
    'aria-label'?: string;
    iconProps?: object;
  }
  export const EuiIconTip: SFC<ToolTipProps & EuiIconTipProps>;
}
