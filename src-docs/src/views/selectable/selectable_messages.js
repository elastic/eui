import React, { Component, Fragment } from 'react';

import {
  EuiSelectable,
  EuiSwitch,
  EuiSelectableMessage,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      useCustomMessage: false,
      isLoading: false,
    };
  }

  onSwitch = e => {
    this.setState({
      useCustomMessage: e.target.checked,
    });
  };

  onLoading = e => {
    this.setState({
      isLoading: e.target.checked,
    });
  };

  render() {
    const { useCustomMessage, isLoading } = this.state;

    const customMessage = (
      <EuiSelectableMessage>You have no spice</EuiSelectableMessage>
    );

    return (
      <Fragment>
        <EuiSwitch
          label="Custom message"
          onChange={this.onSwitch}
          checked={!isLoading && useCustomMessage}
          disabled={isLoading}
        />
        &emsp;
        <EuiSwitch
          label="Show loading"
          onChange={this.onLoading}
          checked={isLoading}
        />
        <EuiSpacer />
        <EuiSelectable
          options={[]}
          style={{ width: 200 }}
          isLoading={isLoading}>
          {list => (useCustomMessage && !isLoading ? customMessage : list)}
        </EuiSelectable>
      </Fragment>
    );
  }
}
