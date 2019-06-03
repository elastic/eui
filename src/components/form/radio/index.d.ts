import { CommonProps, Omit } from '../../common';

import {
  FunctionComponent,
  ChangeEventHandler,
  HTMLAttributes,
  ReactNode,
} from 'react';

declare module '@elastic/eui' {
  /**
   * @see './radio_group.js'
   */
  export interface EuiRadioGroupOption {
    id: string;
    label?: ReactNode;
  }

  export type EuiRadioGroupChangeCallback = (id: string, value: string) => void;

  export type EuiRadioGroupProps = CommonProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
      disabled?: boolean;
      name?: string;
      options?: EuiRadioGroupOption[];
      idSelected?: string;
      onChange: EuiRadioGroupChangeCallback;
    };

  export type x = EuiRadioGroupProps['onChange'];

  export const EuiRadioGroup: FunctionComponent<EuiRadioGroupProps>;

  export interface EuiRadioProps {
    autoFocus?: boolean;
    compressed?: boolean;
    label?: ReactNode;
    name?: string;
    value?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>; // overriding to make it required
  }

  export const EuiRadio: FunctionComponent<
    CommonProps & HTMLAttributes<HTMLDivElement> & EuiRadioProps
  >;
}
