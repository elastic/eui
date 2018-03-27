import React, { Component, Fragment } from 'react';
import {
  EuiDelayHide,
  EuiFlexItem,
  EuiCheckbox,
  EuiFormRow,
  EuiFieldNumber,
  EuiLoadingSpinner,
} from '../../../../src/components';

export default class extends Component {
  state = {
    minimumDuration: 3000,
    hide: false,
  };

  onChangeMinimumDuration = event => {
    this.setState({ minimumDuration: parseInt(event.target.value, 10) });
  };

  onChangeHide = event => {
    this.setState({ hide: event.target.checked });
  };

  render() {
    return (
      <Fragment>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiCheckbox
              id="dummy-id"
              checked={this.state.hide}
              onChange={this.onChangeHide}
              label="Hide child"
            />
          </EuiFormRow>
          <EuiFormRow label="Minimum duration">
            <EuiFieldNumber
              value={this.state.minimumDuration}
              onChange={this.onChangeMinimumDuration}
            />
          </EuiFormRow>

          <EuiFormRow label="Child to render">
            <EuiDelayHide
              hide={this.state.hide}
              minimumDuration={this.state.minimumDuration}
              render={() => <EuiLoadingSpinner size="m" />}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </Fragment>
    );
  }
}
