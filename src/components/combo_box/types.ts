import { ButtonHTMLAttributes } from 'react';
import { CommonProps } from '../common';

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

export type UpdatePositionHandler = (
  listElement?: RefInstance<HTMLDivElement>
) => void;
export type OptionHandler<T> = (option: EuiComboBoxOptionOption<T>) => void;

export type RefInstance<T> = T | null;

export type EuiComboBoxOptionsListPosition = 'top' | 'bottom';

export interface EuiComboBoxSingleSelectionShape {
  asPlainText?: boolean;
}
