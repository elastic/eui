import React, { Component } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonToggle,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle0On: false,
    };
  }

  onToggle0Change = e => {
    this.setState({ toggle0On: e.target.checked });
  };

  render() {
    return (
      <EuiFlexGroup
        wrap
        gutterSize="s"
        alignItems="center"
        className="guideDemo__ghostBackground">
        <EuiFlexItem grow={false}>
          <EuiButton
            color="ghost"
            onClick={() => window.alert('Button clicked')}>
            Primary
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton
            fill
            color="ghost"
            size="s"
            iconType="check"
            onClick={() => window.alert('Button clicked')}>
            Filled
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButtonEmpty
            size="s"
            color="ghost"
            onClick={() => window.alert('Button clicked')}>
            small
          </EuiButtonEmpty>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            size="s"
            color="ghost"
            iconType="user"
            onClick={() => window.alert('Button clicked')}
            aria-label="Your account"
          />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton color="ghost" isLoading fill size="s">
            Loading&hellip;
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton color="ghost" isLoading>
            Loading&hellip;
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButtonToggle
            color="ghost"
            label="Toggle Me"
            fill={this.state.toggle0On}
            onChange={this.onToggle0Change}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
