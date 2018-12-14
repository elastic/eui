import React, { Component, Fragment } from 'react';

import {
  EuiListGroup,
  EuiListGroupItem,
  EuiSpacer,
  EuiSwitch,
  EuiCode,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flushWidth: false,
      showBorder: false,
    };
  }

  toggleFlushWidth = () => {
    this.setState(prevState => ({ flushWidth: !prevState.flushWidth }));
  };

  toggleBorder = () => {
    this.setState(prevState => ({ showBorder: !prevState.showBorder }));
  };

  render() {
    const {
      flushWidth,
      showBorder,
    } = this.state;

    return (
      <Fragment>
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label={<span>Show as <EuiCode>flush</EuiCode></span>}
              checked={this.state.flushWidth}
              onChange={this.toggleFlushWidth}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label={<span>Show as <EuiCode>bordered</EuiCode></span>}
              checked={this.state.showBorder}
              onChange={this.toggleBorder}
            />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="l" />

        <EuiListGroup flush={flushWidth} bordered={showBorder}>
          <EuiListGroupItem
            label={<EuiText size="s">First link</EuiText>}
            href="#"
          />

          <EuiListGroupItem
            label={<EuiText size="s">Second link</EuiText>}
            href="#"
          />

          <EuiListGroupItem
            label={<EuiText size="s">Third link</EuiText>}
            href="#"
            isActive
          />

          <EuiListGroupItem
            label={<EuiText size="s">Fourth link</EuiText>}
            isDisabled
          />

          <EuiListGroupItem
            label={<EuiText size="s">Fifth link</EuiText>}
            href="#"
          />
        </EuiListGroup>
      </Fragment>
    );
  }
}
