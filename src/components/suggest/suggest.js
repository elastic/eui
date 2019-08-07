import React, { Component } from 'react';

import { EuiButton } from '../button';
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

    const button = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}>
        Show popover
      </EuiButton>
    );

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
