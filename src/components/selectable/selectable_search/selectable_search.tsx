/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useCallback, ChangeEvent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { EuiFieldSearch, EuiFieldSearchProps } from '../../form';
import { getMatchingOptions } from '../matching_options';
import { EuiSelectableOption } from '../selectable_option';

export type EuiSelectableSearchProps<T> = CommonProps &
  Omit<
    EuiFieldSearchProps,
    | 'onChange' // Omitted because we're returning our own custom onChange args
    | 'onSearch' // Omitted because we don't need Enter key behavior and we don't want to fire an event on keyup - it messes up the combobox up/down navigation
    | 'incremental' // Must be true (hard-coded below) if we don't support Enter key to search
  > & {
    /**
     * Passes back (searchValue, matchingOptions)
     */
    onChange: (
      searchValue: string,
      matchingOptions: Array<EuiSelectableOption<T>>
    ) => void;
  };

type _EuiSelectableSearchProps<T> = EuiSelectableSearchProps<T> & {
  options: Array<EuiSelectableOption<T>>;
  /**
   * Search value state managed by parent EuiSelectable
   */
  value: string;
  /**
   * The id of the visible list to create the appropriate aria controls
   */
  listId?: string;
  isPreFiltered: boolean;
};

export const EuiSelectableSearch = <T,>({
  onChange: onChangeCallback,
  options,
  value,
  placeholder,
  isPreFiltered,
  listId,
  className,
  ...rest
}: _EuiSelectableSearchProps<T>) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      const matchingOptions = getMatchingOptions<T>(
        options,
        searchValue,
        isPreFiltered
      );
      onChangeCallback(searchValue, matchingOptions);
    },
    [options, isPreFiltered, onChangeCallback]
  );

  const classes = classNames('euiSelectableSearch', className);

  const ariaPropsIfListIsPresent: Partial<EuiFieldSearchProps> | undefined =
    listId
      ? {
          role: 'combobox',
          'aria-autocomplete': 'list',
          'aria-expanded': true,
          'aria-controls': listId,
          'aria-owns': listId, // legacy attribute but shims support for nearly everything atm
        }
      : undefined;

  return (
    <EuiFieldSearch
      className={classes}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      incremental
      fullWidth
      autoComplete="off"
      aria-haspopup="listbox"
      {...ariaPropsIfListIsPresent}
      {...rest}
    />
  );
};
