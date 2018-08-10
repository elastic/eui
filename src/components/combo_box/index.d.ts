import { ReactElement, ReactNode, SFC } from 'react';

declare module '@elastic/eui' {
  export interface EuiComboBoxOptionsListProps {

  }
  export const EuiComboBoxOptionsList: SFC<EuiComboBoxOptionsListProps>;

  export interface EuiComboBoxProps {
    id?: string,
    isDisabled?: boolean,
    className?: string,
    placeholder?: string,
    isLoading?: boolean,
    async?: boolean,
    singleSelection?: boolean,
    noSuggestions?: boolean,
    options?: array,
    selectedOptions?: array,
    onChange?: func,
    onSearchChange?: func,
    onCreateOption?: func,
    renderOption?: func,
    isInvalid?: boolean,
    rowHeight?: number,
    isClearable?: boolean,
    fullWidth?: boolean,
  }
  export const EuiComboBox: SFC<EuiComboBoxProps>;
}
