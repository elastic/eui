import { ButtonHTMLAttributes, ReactElement, ReactNode, SFC } from 'react';
import { EuiComboBoxOption, EuiComboBoxOptionProps } from '@elastic/eui';

declare module '@elastic/eui' {
  export type EuiComboBoxOptionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string,
    isGroupLabelOption: boolean,
  }

  export interface EuiComboBoxOption {
    option: EuiComboBoxOptionProps,
    children?: ReactNode,
    className?: string,
    optionRef?: (ref: HTMLButtonElement) => any,
    onClick: (option: EuiComboBoxOptionProps) => any,
    onEnterKey: (option: EuiComboBoxOptionProps) => any,
    disabled?: boolean,
  }

  export interface EuiComboBoxOptionsListProps {
    options?: Array<EuiComboBoxOptionProps>,
    isLoading?: boolean,
    selectedOptions?: Array<any>,
    onCreateOption?: any,
    searchValue?: string,
    matchingOptions?: Array<EuiComboBoxOptionProps>,
    optionRef?: EuiComboBoxOption['optionRef'],
    onOptionClick?: EuiComboBoxOption['onClick'],
    onOptionEnterKey?: EuiComboBoxOption['onEnterKey'],
    areAllOptionsSelected?: boolean,
    getSelectedOptionForSearchValue?: (searchValue: string, selectedOptions: Array<any>) => EuiComboBoxOptionProps,
    updatePosition: PropTypes.func.isRequired,
    position?: PropTypes.oneOf(POSITIONS),
    listRef: PropTypes.func.isRequired,
    renderOption?: PropTypes.func,
    width?: number,
    scrollToIndex?: number,
    onScroll?: PropTypes.func,
    rowHeight?: number,
    fullWidth?: boolean,
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
