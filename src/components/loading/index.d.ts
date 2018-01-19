/// <reference path="../common.d.ts" />

import { SFC, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './loading_spinner.js'
   */
  export type EuiLoadingSpinnerSize = 's' | 'm' | 'l' | 'xl';

  export type EuiLoadingSpinnerProps = CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      size?: EuiLoadingSpinnerSize;
    };

  export const EuiLoadingSpinner: SFC<EuiLoadingSpinnerProps>;

  /**
   * @see './loading_chart.js'
   */
  export type EuiLoadingChartSize = 'm' | 'l' | 'xl';

  export type EuiLoadingChartProps = CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      mono?: boolean;
      size?: EuiLoadingChartSize;
    };

  export const EuiLoadingChart: SFC<EuiLoadingChartProps>;
}
