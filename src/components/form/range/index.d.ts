/// <reference path="../../common.d.ts" />

import { SFC, ReactNode, HTMLAttributes, ChangeEventHandler, InputHTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './range.js'
   */

  export type EuiRangeLevelColor = 'primary' | 'success' | 'warning' | 'danger';

  export interface EuiRangeProps {
    compressed?: boolean;
    fullWidth?: boolean;
    id?: string;
    levels?: Array<{ min?: number; max?: number; color?: EuiRangeLevelColor }>;
    showInput?: boolean;
    showLabels?: boolean;
    showRange?: boolean;
    showTicks?: boolean;
    showValue?: boolean;
    tickInterval?: number;
  }

  export const EuiRange: SFC<
    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiRangeProps
  >;
}
