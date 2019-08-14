import { CommonProps } from '../../common';

import { FunctionComponent, ButtonHTMLAttributes, ReactNode } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './switch.js'
   */
  export type EuiSwitchProps = CommonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
      label: ReactNode;
      checked: boolean;
      onChange: (
        event: React.FormEvent<HTMLButtonElement & { checked: boolean }>
      ) => void;
      disabled?: boolean;
      compressed?: boolean;
    };

  export const EuiSwitch: FunctionComponent<EuiSwitchProps>;
}
