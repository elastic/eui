import React, {
  Component,
} from 'react';

import {
  EuiToggle,
  EuiButtonIcon,
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
            <EuiButtonIcon iconType="eye" aria-label="s"/>
          ) : (
            <EuiButtonIcon iconType="eyeClosed" aria-label="s"/>
          )}
        </EuiToggle>
      </div>
    );
  }
}
