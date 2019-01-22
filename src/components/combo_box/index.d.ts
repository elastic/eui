import { ButtonHTMLAttributes, ReactNode, SFC, FocusEventHandler } from 'react';
import { ListProps } from 'react-virtualized';
import {
  EuiComboBoxOption,
  EuiComboBoxOptionProps,
  EuiComboBoxOptionsListPosition,
  EuiComboBoxOptionsListProps,
} from '@elastic/eui';
import { RefCallback } from '../common';

declare module '@elastic/eui' {
  export type EuiComboBoxOptionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string,
    isGroupLabelOption?: boolean,
  }

  export type EuiComboBoxOptionsListPosition = 'top' | 'bottom'

  export interface EuiComboBoxOption {
    option: EuiComboBoxOptionProps,
    children?: ReactNode,
    className?: string,
    optionRef?: RefCallback<HTMLButtonElement>,
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
    updatePosition: (parameter?: UIEvent | EuiPanelProps['panelRef']) => any,
    position?: EuiComboBoxOptionsListPosition,
    listRef: EuiPanelProps['panelRef'],
    renderOption?: (option: EuiComboBoxOptionProps, searchValue: string, OPTION_CONTENT_CLASSNAME: string) => ReactNode,
    width?: number,
    scrollToIndex?: number,
    onScroll?: ListProps['onScroll'],
    rowHeight?: number,
    fullWidth?: boolean,
  }
  export const EuiComboBoxOptionsList: SFC<EuiComboBoxOptionsListProps>;

  export type EuiComboBoxSingleSelectionShape = { asPlainText?: boolean; };

  export interface EuiComboBoxProps {
    id?: string,
    isDisabled?: boolean,
    className?: string,
    placeholder?: string,
    isLoading?: boolean,
    async?: boolean,
    singleSelection?: EuiComboBoxSingleSelectionShape | boolean,
    noSuggestions?: boolean,
    options?: EuiComboBoxOptionsListProps['options'],
    selectedOptions?: EuiComboBoxOptionsListProps['selectedOptions'],
    onBlur?: FocusEventHandler<HTMLInputElement>,
    onChange?: (options: Array<EuiComboBoxOptionProps>) => any,
    onFocus?: FocusEventHandler<HTMLInputElement>,
    onSearchChange?: (searchValue: string) => any,
    onCreateOption?: EuiComboBoxOptionsListProps['onCreateOption'],
    renderOption?: EuiComboBoxOptionsListProps['renderOption'],
    isInvalid?: boolean,
    rowHeight?: number,
    isClearable?: boolean,
    fullWidth?: boolean,
    inputRef?: (element: HTMLInputElement) => void;
  }
  export const EuiComboBox: SFC<EuiComboBoxProps>;
}
