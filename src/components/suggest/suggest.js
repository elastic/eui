import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EuiSuggestItem } from './suggest_item';
import { EuiSuggestInput } from './suggest_input';

export class EuiSuggest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      status: 'notYetSaved',
    };
    this.getValue = this.getValue.bind(this);
  }

  getValue(val) {
    this.setState({
      value: val,
    });
  }

  onChange(e) {
    this.props.sendInputValue(e.target.value);
  }

  render() {
    const {
      onItemClick,
      sendInputValue,
      status,
      prefix,
      append,
      suggestions,
      ...rest
    } = this.props;

    const suggestionList = suggestions.map((item, index) => (
      <EuiSuggestItem
        type={item.type}
        key={index}
        label={item.label}
        onClick={onItemClick ? onItemClick.bind(this, item) : undefined}
        description={item.description}
      />
    ));

    const suggestInput = (
      <EuiSuggestInput
        status={status}
        prefix={prefix}
        append={append}
        sendValue={this.getValue}
        suggestions={suggestionList}
        {...rest}
      />
    );
    return <div onChange={this.onChange.bind(this)}>{suggestInput}</div>;
  }
}

EuiSuggest.propTypes = {
  className: PropTypes.string,
  /**
   * Status of the current query 'notYetSaved', 'saved', 'noNewChanges' or 'isLoading'.
   */
  status: PropTypes.oneOf([
    'notYetSaved',
    'saved',
    'noNewChanges',
    'isLoading',
  ]),
  /**
   * Element to be appended to the input bar (e.g. hashtag popover).
   */
  append: PropTypes.node,
  /**
   * Element to be prepended to the input bar (e.g. 'KQL').
   */
  prefix: PropTypes.node,
  /**
   * List of suggestions to display using 'suggestItem'.
   */
  suggestions: PropTypes.array,
  /**
   * Handler for click on a suggestItem.
   */
  onItemClick: PropTypes.func,
  sendInputValue: PropTypes.func,
};

EuiSuggestInput.defaultProps = {
  status: 'noNewChanges',
};
