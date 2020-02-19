import { ButtonHTMLAttributes } from 'react';
import { CommonProps } from '../common';

export { EuiComboBox, EuiComboBoxProps } from './combo_box';
export * from './combo_box_input';
export * from './combo_box_options_list';

// note similarity to `Option` in `components/selectable/types.tsx`
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

export interface EuiComboBoxSingleSelectionShape {
  asPlainText?: boolean;
}
