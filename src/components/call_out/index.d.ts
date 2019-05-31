import { CommonProps, Omit } from '../common';
import { IconType } from '../icon';

import { FunctionComponent, ReactNode, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * EuiCallOut type defs
   *
   * @see './code.js'
   */

  type Color = 'primary' | 'success' | 'warning' | 'danger';
  type Size = 's' | 'm';

  export interface EuiCallOutProps {
    title?: ReactNode;
    iconType?: IconType;
    color?: Color;
    size?: Size;
  }

  export const EuiCallOut: FunctionComponent<
    CommonProps &
      EuiCallOutProps &
      Omit<HTMLAttributes<HTMLDivElement>, 'title'>
  >;
}
