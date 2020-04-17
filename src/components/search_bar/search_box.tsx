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
import { EuiFieldSearch, EuiFieldSearchProps } from '../form';

export interface SchemaType {
  strict?: boolean;
  fields?: any;
  flags?: string[];
}

export interface EuiSearchBoxProps extends EuiFieldSearchProps {
  query: string;
  // This is optional in EuiFieldSearchProps
  onSearch: (queryText: string) => void;
}

type DefaultProps = Pick<EuiSearchBoxProps, 'placeholder' | 'incremental'>;

export class EuiSearchBox extends Component<EuiSearchBoxProps> {
  static defaultProps: DefaultProps = {
    placeholder: 'Search...',
    incremental: false,
  };

  private inputElement: HTMLInputElement | null = null;

  componentDidUpdate(oldProps: EuiSearchBoxProps) {
    if (oldProps.query !== this.props.query && this.inputElement != null) {
      this.inputElement.value = this.props.query;
    }
  }

  render() {
    const { query, incremental, ...rest } = this.props;

    let ariaLabel;
    if (incremental) {
      ariaLabel =
        'This is a search bar. As you type, the results lower in the page will automatically filter.';
    } else {
      ariaLabel =
        'This is a search bar. After typing your query, hit enter to filter the results lower in the page.';
    }

    return (
      <EuiFieldSearch
        inputRef={input => (this.inputElement = input)}
        fullWidth
        defaultValue={query}
        incremental={incremental}
        aria-label={ariaLabel}
        {...rest}
      />
    );
  }
}
