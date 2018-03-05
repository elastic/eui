import React from 'react';
import { EuiFieldSearch } from '../form/field_search/field_search';
import PropTypes from 'prop-types';

export const SearchBoxConfigPropTypes = {
  placeholder: PropTypes.string,
  incremental: PropTypes.bool
};

export class EuiSearchBox extends React.Component {

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
    return (
      <EuiFieldSearch
        inputRef={input => this.inputElement = input}
        fullWidth
        placeholder={this.props.placeholder}
        defaultValue={this.props.query}
        incremental={this.props.incremental}
        onSearch={(query) => this.props.onSearch(query)}
        isInvalid={this.props.isInvalid}
        title={this.props.title}
      />
    );
  }

}
