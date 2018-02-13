/// <reference path="../../common.d.ts" />

import { SFC, InputHTMLAttributes, ReactNode } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './switch.js'
   */
  export type EuiSwitchChangeCallback = (state: boolean) => void;

  export type EuiSwitchProps = CommonProps &
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
      label?: ReactNode;
      onChange?: EuiSwitchChangeCallback;
    };

  export const EuiSwitch: SFC<EuiSwitchProps>;
}
