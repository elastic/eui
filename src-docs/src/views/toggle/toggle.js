import React, {
  Component,
} from 'react';

import {
  EuiToggle,
  EuiButton,
  EuiButtonIcon,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle1On: false,
      toggle2On: false,
      toggle3On: false,
    };
  }

  onToggleChange = (e) => {
    this.setState({ toggle1On: e.target.checked });
  }

  onToggleChange2 = (e) => {
    this.setState({ toggle2On: e.target.checked });
  }

  onToggleChange3 = (e) => {
    this.setState({ toggle3On: e.target.checked });
  }

  render() {
    return (
      <div>
        <EuiToggle id="toggle1" onChange={this.onToggleChange} label="Is toggle on?">
          {this.state.toggle1On ? 'On' : 'Off'}
        </EuiToggle>

        &nbsp;

        <EuiToggle id="toggle2" onChange={this.onToggleChange2} label="Visibility" containsButton>
          {this.state.toggle2On ? (
            <EuiButtonIcon iconType="eye" aria-labelledby="toggle2"/>
          ) : (
            <EuiButtonIcon iconType="eyeClosed" aria-labelledby="toggle2"/>
          )}
        </EuiToggle>

        &nbsp;

        <EuiToggle id="toggle3" onChange={this.onToggleChange3} label="Is toggle on?" containsButton>
          {this.state.toggle3On ? (
            <EuiButton fill>Toggle is on</EuiButton>
          ) : (
            <EuiButton>Toggle is off</EuiButton>
          )}
        </EuiToggle>
      </div>
    );
  }
}
