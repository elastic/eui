import React, { Component } from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiProgress,
  EuiText,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      showProgress: false,
    };

    this.toggleProgress = this.toggleProgress.bind(this);
  }

  toggleProgress() {
    const currentState = this.state.showProgress;

    if (!currentState) {
      this.timer = setTimeout(() => this.progress(0), 250);
    } else {
      clearTimeout(this.timer);
      this.setState({ value: 0 });
    }

    this.setState({
      showProgress: !this.state.showProgress,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(value) {
    if (value > 100) {
      this.setState({ value: 100 });
    } else {
      this.setState({ value });
      const diff = Math.round(Math.random() * 10);
      this.timer = setTimeout(() => this.progress(value + diff), 250);
    }
  }

  render() {
    return (
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButton size="s" onClick={this.toggleProgress}>
            Toggle progress
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText>
            <p>{this.state.value}</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiProgress value={this.state.value} max={100} size="xs" />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
