/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ChangeEvent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { EuiFieldSearch, EuiFieldSearchProps } from '../../form';
import { getMatchingOptions } from '../matching_options';
import { EuiSelectableOption } from '../selectable_option';

export type EuiSelectableSearchProps<T> = Omit<
  EuiFieldSearchProps,
  | 'onChange' // Omitted because we're returning our own custom onChange args
  | 'onSearch' // Omitted because we don't need Enter key behavior and we don't want to fire an event on keyup - it messes up the combobox up/down navigation
  | 'incremental' // Must be true (hard-coded below) if we don't support Enter key to search
> &
  CommonProps & {
    /**
     * Passes back (matchingOptions, searchValue)
     */
    onChange: (
      matchingOptions: Array<EuiSelectableOption<T>>,
      searchValue: string
    ) => void;
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

export class EuiSelectableSearch<T> extends Component<
  EuiSelectableSearchProps<T>
> {
  componentDidMount() {
    const { value } = this.props;
    const matchingOptions = getMatchingOptions<T>(
      this.props.options,
      value,
      this.props.isPreFiltered
    );
    this.props.onChange(matchingOptions, value);
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const matchingOptions = getMatchingOptions<T>(
      this.props.options,
      searchValue,
      this.props.isPreFiltered
    );
    this.props.onChange(matchingOptions, searchValue);
  };

  render() {
    const {
      className,
      onChange,
      options,
      value,
      listId,
      placeholder,
      isPreFiltered,
      ...rest
    } = this.props;

    const classes = classNames('euiSelectableSearch', className);

    const ariaPropsIfListIsPresent:
      | Partial<EuiFieldSearchProps>
      | undefined = listId
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
        onChange={this.onChange}
        incremental
        fullWidth
        autoComplete="off"
        aria-haspopup="listbox"
        {...ariaPropsIfListIsPresent}
        {...rest}
      />
    );
  }
}
