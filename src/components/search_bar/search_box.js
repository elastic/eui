import React, { Component } from 'react';
import { EuiFieldSearch } from '../form/field_search/field_search';
import PropTypes from 'prop-types';

export const SchemaType = PropTypes.shape({
  strict: PropTypes.bool,
  fields: PropTypes.object,
  flags: PropTypes.arrayOf(PropTypes.string)
});

export const SearchBoxConfigPropTypes = {
  placeholder: PropTypes.string,
  incremental: PropTypes.bool,
  schema: SchemaType
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

  componentDidUpdate() {
    this.inputElement.value = this.props.query;
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
