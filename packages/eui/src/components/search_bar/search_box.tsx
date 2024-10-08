/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useRef, useLayoutEffect } from 'react';

import { useEuiI18n } from '../i18n';
import { EuiFieldSearch, EuiFieldSearchProps } from '../form';
import { EuiInputPopover } from '../popover';

import { EuiSearchBarProps } from './search_bar';

export interface EuiSearchBoxProps extends EuiFieldSearchProps {
  query: string;
  // This is optional in EuiFieldSearchProps
  onSearch: (queryText: string) => void;
  /**
   * @default Search...
   */
  placeholder?: string;
  hint?: {
    id: string;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
  } & EuiSearchBarProps['hint'];
}

export const EuiSearchBox: FunctionComponent<EuiSearchBoxProps> = ({
  query,
  placeholder,
  incremental,
  hint,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = query;
      inputRef.current.dispatchEvent(new Event('change'));
    }
  }, [query]);

  const defaultPlaceholder = useEuiI18n(
    'euiSearchBox.placeholder',
    'Search...'
  );
  const ariaLabelIncremental = useEuiI18n(
    'euiSearchBox.incrementalAriaLabel',
    'This is a search bar. As you type, the results lower in the page will automatically filter.'
  );
  const ariaLabelEnter = useEuiI18n(
    'euiSearchBox.ariaLabel',
    'This is a search bar. After typing your query, hit enter to filter the results lower in the page.'
  );

  const search = (
    <EuiFieldSearch
      inputRef={(input) => (inputRef.current = input)}
      fullWidth
      defaultValue={query}
      incremental={incremental}
      aria-label={incremental ? ariaLabelIncremental : ariaLabelEnter}
      placeholder={placeholder ?? defaultPlaceholder}
      onFocus={() => {
        hint?.setIsVisible(true);
      }}
      {...rest}
    />
  );

  if (hint) {
    return (
      <EuiInputPopover
        disableFocusTrap
        input={search}
        isOpen={hint.isVisible}
        fullWidth
        closePopover={() => {
          hint.setIsVisible(false);
        }}
        panelProps={{
          'aria-live': undefined,
          'aria-modal': undefined,
          role: undefined,
          tabIndex: -1,
          id: hint.id,
        }}
        {...hint.popoverProps}
      >
        {hint.content}
      </EuiInputPopover>
    );
  }

  return search;
};
