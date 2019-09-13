import React, { Component } from 'react';

import {
  EuiButtonEmpty,
  EuiPopover,
  EuiPopoverTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

import GlobalFilterForm from './global_filter_form';

export default class GlobalFilterAdd extends Component {
  static propTypes = {};

  state = {
    isPopoverOpen: false,
  };

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
        withTitle>
        <EuiPopoverTitle>
          <EuiFlexGroup alignItems="baseline">
            <EuiFlexItem>Add a filter</EuiFlexItem>
            <EuiFlexItem grow={false}>
              {/* This button should open a modal */}
              <EuiButtonEmpty flush="right" size="xs">
                Edit as Query DSL
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPopoverTitle>

        <GlobalFilterForm
          style={{ width: 400 }}
          onAdd={this.togglePopover}
          onCancel={this.togglePopover}
        />
      </EuiPopover>
    );
  }
}
