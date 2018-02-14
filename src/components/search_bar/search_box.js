import React from 'react';
import { EuiFieldSearch } from '../form/field_search/field_search';
import PropTypes from 'prop-types';
import { Query } from './query';
import { isNil } from '../../services/predicate';

export const SearchBoxConfigPropTypes = {
  placeholder: PropTypes.string,
  incremental: PropTypes.bool
};

export class EuiSearchBox extends React.Component {

  static propTypes = {
    query: PropTypes.instanceOf(Query).isRequired,
    onChange: PropTypes.func.isRequired,
    ...SearchBoxConfigPropTypes
  };

  static defaultProps = {
    placeholder: 'Search...',
    incremental: false
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.error) {
      this.inputElement.value = nextState.error.query;
    } else {
      this.inputElement.value = nextProps.query.text;
    }
  }

  onSearch(queryText) {
    try {
      const query = Query.parse(queryText);
      this.setState({ error: null });
      this.props.onChange(query);
    } catch (e) {
      const error = { query: queryText, message: e.message };
      this.setState({ error });
    }
  }

  render() {
    const { query, placeholder, incremental } = this.props;
    const value = this.state.error ? this.state.error.query : query.text;
    const isInvalid = !isNil(this.state.error);
    const title = !isNil(this.state.error) ? this.state.error.message : undefined;
    return (
      <EuiFieldSearch
        inputRef={input => this.inputElement = input}
        fullWidth
        placeholder={placeholder}
        defaultValue={value}
        incremental={incremental}
        onSearch={this.onSearch.bind(this)}
        isInvalid={isInvalid}
        title={title}
      />
    );
  }

}
