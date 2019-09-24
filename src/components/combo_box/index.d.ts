import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  FunctionComponent,
  FocusEventHandler,
} from 'react';
import { ListProps } from 'react-virtualized'; // eslint-disable-line import/named
import {
  EuiComboBoxOption,
  EuiComboBoxOptionProps,
  EuiComboBoxOptionsListPosition,
  EuiComboBoxOptionsListProps,
  EuiComboBoxProps,
} from '@elastic/eui'; // eslint-disable-line import/no-unresolved
import { RefCallback, CommonProps, Omit } from '../common';
import { EuiPanelProps } from '../panel/panel';

declare module '@elastic/eui' {
  export type EuiComboBoxOptionProps<
    T = string | number | string[] | undefined
  > = CommonProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {
      label: string;
      isGroupLabelOption?: boolean;
      options?: Array<EuiComboBoxOptionProps<T>>;
      value?: T;
    };

  export type EuiComboBoxOptionsListPosition = 'top' | 'bottom';

  export interface EuiComboBoxOption<T> {
    option: EuiComboBoxOptionProps<T>;
    children?: ReactNode;
    className?: string;
    optionRef?: RefCallback<HTMLButtonElement>;
    onClick: (option: EuiComboBoxOptionProps<T>) => any;
    onEnterKey: (option: EuiComboBoxOptionProps<T>) => any;
    disabled?: boolean;
  }

  export interface EuiComboBoxOptionsListProps<T> {
    options?: Array<EuiComboBoxOptionProps<T>>;
    isLoading?: boolean;
    selectedOptions?: any[];
    onCreateOption?: any;
    searchValue?: string;
    matchingOptions?: Array<EuiComboBoxOptionProps<T>>;
    optionRef?: EuiComboBoxOption<T>['optionRef'];
    onOptionClick?: EuiComboBoxOption<T>['onClick'];
    onOptionEnterKey?: EuiComboBoxOption<T>['onEnterKey'];
    areAllOptionsSelected?: boolean;
    getSelectedOptionForSearchValue?: (
      searchValue: string,
      selectedOptions: any[]
    ) => EuiComboBoxOptionProps<T>;
    updatePosition: (parameter?: UIEvent | EuiPanelProps['panelRef']) => any;
    position?: EuiComboBoxOptionsListPosition;
    listRef: EuiPanelProps['panelRef'];
    renderOption?: (
      option: EuiComboBoxOptionProps<T>,
      searchValue: string,
      OPTION_CONTENT_CLASSNAME: string
    ) => ReactNode;
    width?: number;
    scrollToIndex?: number;
    onScroll?: ListProps['onScroll'];
    rowHeight?: number;
    fullWidth?: boolean;
  }
  export function EuiComboBoxOptionsList<T>(
    props: EuiComboBoxOptionsListProps<T>
  ): ReturnType<FunctionComponent<EuiComboBoxOptionsListProps<T>>>;

  export interface EuiComboBoxSingleSelectionShape {
    asPlainText?: boolean;
  }

  export interface EuiComboBoxProps<T> {
    id?: string;
    isDisabled?: boolean;
    compressed?: boolean;
    className?: string;
    placeholder?: string;
    isLoading?: boolean;
    async?: boolean;
    singleSelection?: EuiComboBoxSingleSelectionShape | boolean;
    noSuggestions?: boolean;
    options?: EuiComboBoxOptionsListProps<T>['options'];
    selectedOptions?: EuiComboBoxOptionsListProps<T>['selectedOptions'];
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onChange?: (options: Array<EuiComboBoxOptionProps<T>>) => any;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onSearchChange?: (searchValue: string) => any;
    onCreateOption?: EuiComboBoxOptionsListProps<T>['onCreateOption'];
    renderOption?: EuiComboBoxOptionsListProps<T>['renderOption'];
    isInvalid?: boolean;
    rowHeight?: number;
    isClearable?: boolean;
    fullWidth?: boolean;
    inputRef?: (element: HTMLInputElement) => void;
  }

  export function EuiComboBox<T>(
    props: EuiComboBoxProps<T> &
      Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>
  ): ReturnType<FunctionComponent<EuiComboBoxProps<T>>>;
}
