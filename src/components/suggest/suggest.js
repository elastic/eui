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
      isPopoverOpen: false,
    };
  }

  onButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  render() {
    const {
      className,
      status,
      label,
      prefix,
      suggestions,
      ...rest
    } = this.props;

    const suggestionList = (suggestions.map((item, index) => (
      <EuiSuggestItem
        type={item.type}
        key={index}
        label={item.label}
        description={item.description}
      />
    )));

    const suggestInput = (
      <EuiSuggestInput
        status={status}
        label={label}
        prefix={prefix}
        suggestions={suggestionList}
      />
    );

    return <div>{suggestInput}</div>;
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
   * Label that goes next to the status element (e.g. KQL).
   */
  label: PropTypes.node,
  /**
   * Element to be appended to the input bar.
   */
  prefix: PropTypes.node,
  /**
   * List of suggestions to display using 'suggestItem'.
   */
  suggestions: PropTypes.array,
};
