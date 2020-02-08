import { ButtonHTMLAttributes } from 'react';
import { CommonProps } from '../common';

export { EuiComboBox } from './combo_box';

export type EuiComboBoxOptionOption<
  T = string | number | string[] | undefined
> = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {
    isGroupLabelOption?: boolean;
    label: string;
    options?: Array<EuiComboBoxOptionOption<T>>;
    value?: T;
  };

export type EuiComboBoxOptionsListPosition = 'top' | 'bottom';
