export type OptionCheckedType = 'on' | 'off' | undefined;

export interface Option {
  label: string;
  value?: string;
  checked?: OptionCheckedType;
  disabled?: boolean;
  isGroupLabel?: boolean;
}
