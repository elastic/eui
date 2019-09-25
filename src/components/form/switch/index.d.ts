import { CommonProps } from '../../common';

import { FunctionComponent, InputHTMLAttributes, ReactNode } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './switch.js'
   */
  export type EuiSwitchProps = CommonProps &
    InputHTMLAttributes<HTMLInputElement> & {
      label?: ReactNode;
      compressed?: boolean;
    };

  export const EuiSwitch: FunctionComponent<EuiSwitchProps>;
}
