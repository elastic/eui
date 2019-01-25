import { CommonProps } from '../../common';

import { SFC, ReactNode, HTMLAttributes, ChangeEventHandler, InputHTMLAttributes } from 'react';

declare module '@elastic/eui' {
  export type EuiRangeLevelColor = 'primary' | 'success' | 'warning' | 'danger';

  /**
   * single range type def
   *
   * @see './range.js'
   */

  export interface EuiRangeProps {
    compressed?: boolean;
    fullWidth?: boolean;
    id?: string;
    levels?: Array<{ min?: number; max?: number; color?: EuiRangeLevelColor }>;
    // `min` and `max` are optional in HTML but required for our component,
    // so we override them.
    max: number;
    min: number;
    // The spec allows string values for `step` but the component requires
    // a number.
    step?: number;
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

  /**
   * dual range type defs
   *
   * @see './dual_range.js'
   */

    export interface EuiDualRangeProps {
      // Override acceptable value type
      value: Array<number | string>
    }

    export const EuiDualRange: SFC<
      CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiRangeProps & EuiDualRangeProps
    >;
}
