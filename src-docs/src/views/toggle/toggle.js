import React, {
  Component,
} from 'react';

import {
  EuiToggle,
  EuiIcon,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleOn: false,
      toggleOn2: false,
    };
  }

  onToggleChange = (e) => {
    this.setState({ toggleOn: e.target.checked });
  }

  onToggleChange2 = (e) => {
    this.setState({ toggleOn2: e.target.checked });
  }

  render() {
    return (
      <div>
        <EuiToggle onChange={this.onToggleChange}>
          {this.state.toggleOn ? 'On' : 'Off'}
        </EuiToggle>

        &nbsp;

        <EuiToggle onChange={this.onToggleChange2}>
          {this.state.toggleOn2 ? (
            <EuiIcon type="eye" />
          ) : (
            <EuiIcon type="eyeClosed" />
          )}
        </EuiToggle>
      </div>
    );
  }
}
