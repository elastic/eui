import React, {
  Component,
} from 'react';

import {
  EuiButtonToggle,
  EuiStat,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  onToggleChange = (e) => {
    this.setState({ isLoading: e.target.checked });
  }

  render() {
    return (
      <div>
        <EuiStat
          title="7,600 mm"
          description="Total People"
          isLoading={this.state.isLoading}
        />
        <EuiSpacer />
        <EuiButtonToggle onChange={this.onToggleChange} label={`isLoading: ${this.state.isLoading}`} isSelected={this.state.isLoading} />
      </div>
    );
  }
}