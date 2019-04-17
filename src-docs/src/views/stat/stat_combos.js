import React, {
  Component,
} from 'react';

import {
  EuiStat,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
  EuiIcon,
  EuiButtonToggle,
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
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel>
              <EuiStat
                title="8,888"
                description="Total widgets"
                textAlign="right"
                isLoading={this.state.isLoading}
              >
                <EuiIcon type="empty" />
              </EuiStat>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel>
              <EuiStat
                title="2,000"
                description="Pending widgets"
                titleColor="accent"
                textAlign="right"
                isLoading={this.state.isLoading}
              >
                <EuiIcon type="clock" color="accent" />
              </EuiStat>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel>
              <EuiStat
                title="6,800"
                description="Success widgets"
                titleColor="secondary"
                textAlign="right"
                isLoading={this.state.isLoading}
              >
                <EuiIcon type="check" color="secondary" />
              </EuiStat>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel>
              <EuiStat
                title="88"
                description="Error widgets"
                titleColor="danger"
                textAlign="right"
                isLoading={this.state.isLoading}
              >
                <EuiIcon type="alert" color="danger" />
              </EuiStat>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
        <EuiButtonToggle onChange={this.onToggleChange} label={`isLoading: ${this.state.isLoading}`} isSelected={this.state.isLoading} />
      </div>
    );
  }
}
