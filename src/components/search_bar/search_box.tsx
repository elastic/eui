/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
      this.inputElement.dispatchEvent(new Event('change'));
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
        inputRef={(input) => (this.inputElement = input)}
        fullWidth
        defaultValue={query}
        incremental={incremental}
        aria-label={ariaLabel}
        {...rest}
      />
    );
  }
}
