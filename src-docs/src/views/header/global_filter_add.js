import React, { Component } from 'react';

import {
  EuiButtonEmpty,
  EuiPopover,
  EuiPopoverTitle,
} from '../../../../src/components';

import GlobalFilterForm from './global_filter_form';

export default class GlobalFilterAdd extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  togglePopover = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({ isPopoverOpen: false });
  };

  render() {
    const { isPopoverOpen } = this.state;

    return (
      <EuiPopover
        isOpen={isPopoverOpen}
        closePopover={this.closePopover}
        button={
          <EuiButtonEmpty onClick={this.togglePopover} size="xs">
            + Add filter
          </EuiButtonEmpty>
        }
        anchorPosition="downCenter"
        withTitle
      >
        <EuiPopoverTitle>Add a filter</EuiPopoverTitle>

        <GlobalFilterForm style={{ width: 400 }} onAdd={this.togglePopover} onCancel={this.togglePopover} />
      </EuiPopover>
    );
  }
}
