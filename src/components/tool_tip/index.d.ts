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

  export interface EuiToolTipProps {
    children: ReactElement<any>;
    className?: string;
    content: ReactNode;
    delay?: ToolTipDelay;
    title?: ReactNode;
    id?: string;
    position?: ToolTipPositions;
  }
  export const EuiToolTip: SFC<EuiToolTipProps>;

  export interface EuiIconTipProps {
    color?: string;
    type?: string;
    size?: string;
    'aria-label'?: string;
    content: ReactNode;
  }
  export const EuiIconTip: SFC<EuiIconTipProps>;
}
