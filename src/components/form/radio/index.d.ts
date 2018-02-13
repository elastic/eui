/// <reference path="../../common.d.ts" />

import { SFC, HTMLAttributes, ReactNode } from 'react';

declare module '@elastic/eui' {
  /**
   * @see './radio_group.js'
   */
  export interface EuiRadioGroupOption {
    id: string;
    label?: ReactNode;
  }

  export type EuiRadioGroupChangeCallback = (id: string) => void;

  export type EuiRadioGroupProps = CommonProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
      options?: EuiRadioGroupOption[];
      idSelected?: string;
      onChange: EuiRadioGroupChangeCallback;
    };

  export type x = EuiRadioGroupProps['onChange'];

  export const EuiRadioGroup: SFC<EuiRadioGroupProps>;
}
