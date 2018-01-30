import React from 'react';
import { EuiFieldSearch } from '../../form/field_search/field_search';
import PropTypes from 'prop-types';
import { Query } from './query';
import { isNil } from '../../../services/predicate';

export const SearchBoxConfigType = PropTypes.shape({
  placeholder: PropTypes.string,
  incremental: PropTypes.bool
});

const defaults = {
  config: {
    placeholder: 'Search...',
    incremental: false
  }
};

export class SearchBox extends React.Component {

  static propTypes = {
    query: PropTypes.instanceOf(Query).isRequired,
    onChange: PropTypes.func.isRequired,
    config: SearchBoxConfigType
  };

  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps) {
    this.inputElement.value = nextProps.query.text;
  }

  onSearch(queryText) {
    this.props.onChange(Query.parse(queryText));
  }

  render() {
    const { config, query } = this.props;
    const placeholder = config.placeholder || defaults.config.placeholder;
    const incremental = !isNil(config.incremental) ? config.incremental : defaults.config.incremental;
    const value = query.text;
    return (
      <EuiFieldSearch
        inputRef={input => this.inputElement = input}
        fullWidth
        placeholder={placeholder}
        defaultValue={value}
        incremental={incremental}
        onSearch={this.onSearch.bind(this)}
      />
    );
  }

}
