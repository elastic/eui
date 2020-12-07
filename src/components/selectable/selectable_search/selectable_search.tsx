/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { EuiFieldSearch, EuiFieldSearchProps } from '../../form';
import { getMatchingOptions } from '../matching_options';
import { EuiSelectableOption } from '../selectable_option';

export type EuiSelectableSearchProps<T> = Omit<
  EuiFieldSearchProps,
  'onChange'
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
    defaultValue: string;
    /**
     * The id of the visible list to create the appropriate aria controls
     */
    listId?: string;
    isPreFiltered: boolean;
  };

export interface EuiSelectableSearchState {
  searchValue: string;
}

export class EuiSelectableSearch<T> extends Component<
  EuiSelectableSearchProps<T>,
  EuiSelectableSearchState
> {
  static defaultProps = {
    defaultValue: '',
  };

  constructor(props: EuiSelectableSearchProps<T>) {
    super(props);

    this.state = {
      searchValue: props.defaultValue,
    };
  }

  componentDidMount() {
    const { searchValue } = this.state;
    const matchingOptions = getMatchingOptions<T>(
      this.props.options,
      searchValue,
      this.props.isPreFiltered
    );
    this.props.onChange(matchingOptions, searchValue);
  }

  onSearchChange = (value: string) => {
    if (value !== this.state.searchValue) {
      this.setState({ searchValue: value }, () => {
        const matchingOptions = getMatchingOptions<T>(
          this.props.options,
          value,
          this.props.isPreFiltered
        );
        this.props.onChange(matchingOptions, value);
      });
    }
  };

  render() {
    const {
      className,
      onChange,
      options,
      defaultValue,
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
        onSearch={this.onSearchChange}
        incremental
        defaultValue={defaultValue}
        fullWidth
        autoComplete="off"
        aria-haspopup="listbox"
        {...ariaPropsIfListIsPresent}
        {...rest}
      />
    );
  }
}
