import React, { Component, Fragment } from 'react';
import {
  EuiDelayRender,
  EuiFlexItem,
  EuiCheckbox,
  EuiFormRow,
  EuiFieldNumber,
  EuiLoadingSpinner,
} from '../../../../src/components';

export default class extends Component {
  state = {
    minimumDelay: 3000,
    render: false,
  };

  onChangeMinimumDelay = event => {
    this.setState({ minimumDelay: parseInt(event.target.value, 10) });
  };

  onChangeHide = event => {
    this.setState({ render: event.target.checked });
  };

  render() {
    const status = this.state.render ? 'showing' : 'hidden';
    const label = `Child (${status})`;
    return (
      <Fragment>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiCheckbox
              id="dummy-id"
              checked={this.state.render}
              onChange={this.onChangeHide}
              label="Show child"
            />
          </EuiFormRow>
          <EuiFormRow label="Minimum delay">
            <EuiFieldNumber
              value={this.state.minimumDelay}
              onChange={this.onChangeMinimumDelay}
            />
          </EuiFormRow>

          <EuiFormRow label={label}>
            {this.state.render ? (
              <EuiDelayRender delay={this.state.minimumDelay}>
                <EuiLoadingSpinner size="m" />
              </EuiDelayRender>
            ) : (
              <Fragment />
            )}
          </EuiFormRow>
        </EuiFlexItem>
      </Fragment>
    );
  }
}
