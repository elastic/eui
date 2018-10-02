/// <reference path="../../common.d.ts" />

import { SFC, InputHTMLAttributes, ReactNode } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './switch.js'
   */
  export type EuiSwitchProps = CommonProps &
    InputHTMLAttributes<HTMLInputElement> & {
      label?: ReactNode;
    };

  export const EuiSwitch: SFC<EuiSwitchProps>;
}
