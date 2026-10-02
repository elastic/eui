/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  InputHTMLAttributes,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';

import {
  keys,
  withEuiStylesMemoizer,
  WithEuiStylesMemoizerProps,
} from '../../../services';
import { Browser } from '../../../services/browser';
import { CommonProps } from '../../common';
import { EuiI18n } from '../../i18n';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';
import { EuiValidatableControl } from '../validatable_control';
import { FormContext, FormContextValue } from '../eui_form_context';

import { euiFieldSearchStyles } from './field_search.styles';

export interface EuiFieldSearchProps
  extends CommonProps,
    InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  isInvalid?: boolean;
  /**
   * Expand to fill 100% of the parent.
   * Defaults to `fullWidth` prop of `<EuiForm>`.
   * @default false
   */
  fullWidth?: boolean;
  isLoading?: boolean;
  /**
   * Called when the user presses [Enter] OR on change if the incremental prop is `true`.
   * If you don't need the on[Enter] functionality, prefer using onChange
   */
  onSearch?: (value: string) => void;
  /**
   * When `true` the search will be executed (that is, the `onSearch` will be called) as the
   * user types.
   */
  incremental?: boolean;
  /**
   * when `true` creates a shorter height input
   */
  compressed?: boolean;
  inputRef?: (node: HTMLInputElement | null) => void;
  /**
   * Shows a button that quickly clears any input
   */
  isClearable?: boolean;
  /**
   * Creates an input group with element(s) coming before input
   * `string` | `ReactElement` or an array of these
   */
  prepend?: EuiFormControlLayoutProps['prepend'];

  /**
   * Creates an input group with element(s) coming after input.
   * `string` | `ReactElement` or an array of these
   */
  append?: EuiFormControlLayoutProps['append'];
}

export const EuiFieldSearchUI: React.FC<
  EuiFieldSearchProps & WithEuiStylesMemoizerProps
> = ({
  stylesMemoizer,
  className,
  id,
  name,
  placeholder,
  value: valueProp,
  defaultValue,
  isInvalid,
  disabled,
  fullWidth: fullWidthProp,
  isLoading = false,
  inputRef,
  incremental = false,
  compressed = false,
  onSearch,
  isClearable: _isClearable = true,
  append,
  prepend,
  onKeyUp: onKeyUpProp,
  ...rest
}) => {
  const { defaultFullWidth } = useContext(FormContext) as FormContextValue;
  const fullWidth = fullWidthProp ?? defaultFullWidth;

  const [valueState, setValueState] = useState(
    valueProp || String(defaultValue || '')
  );

  const inputRefInternal = useRef<HTMLInputElement | null>(null);

  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRefInternal.current = node;
      if (inputRef) {
        inputRef(node);
      }
    },
    [inputRef]
  );

  let value = valueProp;
  if (typeof valueProp !== 'string') value = valueState;

  const isClearable = Boolean(
    _isClearable && value && !rest.readOnly && !disabled
  );

  useEffect(() => {
    const inputElement = inputRefInternal.current;
    if (!inputElement) return;

    const isSearchSupported = Browser.isEventSupported('search', inputElement);

    const handleSearch = (event?: Event) => {
      if (onSearch) {
        if (!event || !event.target || event.defaultPrevented) return;
        onSearch((event.target as HTMLInputElement).value);
      }
    };

    const handleChange = (event: Event) => {
      if (
        event.target &&
        (event.target as HTMLInputElement).value !== valueState
      ) {
        const newValue = (event.target as HTMLInputElement).value;
        setValueState(newValue);
        if (onSearch) {
          onSearch(newValue);
        }
      }
    };

    if (isSearchSupported) {
      inputElement.addEventListener('search', handleSearch);
    }
    inputElement.addEventListener('change', handleChange);

    return () => {
      if (isSearchSupported) {
        inputElement.removeEventListener('search', handleSearch);
      }
      inputElement.removeEventListener('change', handleChange);
    };
  }, [onSearch, valueState]);

  const onClear = () => {
    const inputElement = inputRefInternal.current;
    const nativeInputValue = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    );
    const nativeInputValueSetter = nativeInputValue
      ? nativeInputValue.set
      : undefined;

    if (nativeInputValueSetter && inputElement) {
      nativeInputValueSetter.call(inputElement, '');
    }

    const event = new Event('input', {
      bubbles: true,
      cancelable: false,
    });

    if (inputElement) {
      inputElement.dispatchEvent(event);
      inputElement.focus();
      inputElement.dispatchEvent(new Event('change'));
    }
    setValueState('');

    if (onSearch && incremental) {
      onSearch('');
    }
  };

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    setValueState((event.target as HTMLInputElement).value);

    if (onKeyUpProp) {
      onKeyUpProp(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    const inputElement = inputRefInternal.current;
    const isSearchSupported = inputElement
      ? Browser.isEventSupported('search', inputElement)
      : false;

    if (
      onSearch &&
      ((event.key !== keys.ENTER && incremental) ||
        (event.key === keys.ENTER && !isSearchSupported))
    ) {
      onSearch((event.target as HTMLInputElement).value);
    }
  };

  const classes = classNames(
    'euiFieldSearch',
    {
      'euiFieldSearch-isLoading': isLoading,
      'euiFieldSearch-isClearable': isClearable,
      'euiFieldSearch-isInvalid': isInvalid,
    },
    className
  );

  const styles = stylesMemoizer(euiFieldSearchStyles);
  const cssStyles = [
    styles.euiFieldSearch,
    compressed ? styles.compressed : styles.uncompressed,
    fullWidth ? styles.fullWidth : styles.formWidth,
    (prepend || append) && styles.inGroup,
  ];

  return (
    <EuiI18n
      token="euiFieldSearch.clearSearchButtonLabel"
      default="Clear search input"
    >
      {(clearSearchButtonLabel: string) => (
        <EuiFormControlLayout
          icon="magnify"
          fullWidth={fullWidth}
          isLoading={isLoading}
          isInvalid={isInvalid}
          isDisabled={disabled}
          clear={
            isClearable
              ? {
                  onClick: onClear,
                  'aria-label': clearSearchButtonLabel,
                  'data-test-subj': 'clearSearchButton',
                }
              : undefined
          }
          compressed={compressed}
          append={append}
          prepend={prepend}
        >
          <EuiValidatableControl isInvalid={isInvalid}>
            <input
              type="search"
              id={id}
              name={name}
              placeholder={placeholder}
              className={classes}
              css={cssStyles}
              onKeyUp={onKeyUp}
              disabled={disabled}
              ref={setRef}
              {...rest}
            />
          </EuiValidatableControl>
        </EuiFormControlLayout>
      )}
    </EuiI18n>
  );
};

/**
 * @see {@link https://eui.elastic.co/docs/components/forms/search-and-filter/search/|EuiFieldSearch documentation}
 */
export const EuiFieldSearch = withEuiStylesMemoizer<EuiFieldSearchProps>(
  EuiFieldSearchUI
);