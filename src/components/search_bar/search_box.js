import React, { Component } from 'react';
import { EuiFieldSearch } from '../form/field_search/field_search';
import PropTypes from 'prop-types';

export const SearchBoxConfigPropTypes = {
  placeholder: PropTypes.string,
  incremental: PropTypes.bool
};

export class EuiSearchBox extends Component {

  static propTypes = {
    query: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired, // (queryText) => void
    isInvalid: PropTypes.bool,
    title: PropTypes.string,
    ...SearchBoxConfigPropTypes
  };

  static defaultProps = {
    placeholder: 'Search...',
    incremental: false
  };

  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps) {
    this.inputElement.value = nextProps.query;
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

    return (
      <EuiFieldSearch
        inputRef={input => this.inputElement = input}
        fullWidth
        placeholder={placeholder}
        defaultValue={query}
        incremental={incremental}
        onSearch={(query) => onSearch(query)}
        isInvalid={isInvalid}
        title={title}
        {...rest}
      />
    );
  }

}
