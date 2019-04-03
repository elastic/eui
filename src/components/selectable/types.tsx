import { CommonProps } from '../common';

export type OptionCheckedType = 'on' | 'off' | undefined;

// Button or DIV type
export interface Option extends CommonProps {
  label: string;
  value?: string;
  checked?: OptionCheckedType;
  disabled?: boolean;
  isGroupLabel?: boolean;
}
