import React, { Component } from 'react';
import { EuiFieldSearch } from '../form';
import { CommonProps } from '../common';

export interface SchemaType {
  strict?: boolean;
  fields?: any;
  flags?: string[];
}

export interface SearchBoxConfigProps extends CommonProps {
  placeholder?: string;
  incremental?: boolean;
  // Boolean values are not meaningful to this component, but are allowed so that other
  // components can use e.g. a true value to mean "auto-derive a schema". See EuiInMemoryTable.
  // Admittedly, this is a bit of a hack.
  schema?: SchemaType | boolean;
}

export interface EuiSearchBoxProps extends SearchBoxConfigProps {
  query: string;
  onSearch: (queryText: string) => void;
  isInvalid?: boolean;
  title?: string;
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
    const {
      placeholder,
      query,
      incremental,
      onSearch,
      isInvalid,
      title,
      ...rest
    } = this.props;

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
        placeholder={placeholder}
        defaultValue={query}
        incremental={incremental}
        onSearch={query => onSearch(query)}
        isInvalid={isInvalid}
        aria-label={ariaLabel}
        title={title}
        {...rest}
      />
    );
  }
}
