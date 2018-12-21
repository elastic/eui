import React, { Component, Fragment } from 'react';

import {
  EuiListGroup,
  EuiSpacer,
  EuiSwitch,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const myContent = [
  {
    label: 'First link',
    href: window.location.href,
    iconType: 'calendar',
    size: 's',
  },
  {
    label: 'Second link is active',
    href: window.location.href,
    isActive: true,
    iconType: 'clock',
    size: 's',
  },
  {
    label: 'Third link is disabled',
    href: window.location.href,
    isDisabled: true,
    iconType: 'compute',
    size: 's',
  },
  {
    label: 'Fourth link',
    href: window.location.href,
    iconType: 'copyClipboard',
    size: 's',
  },
  {
    label: 'Fifth link',
    href: window.location.href,
    iconType: 'crosshairs',
    size: 's',
  },
];


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

        <EuiListGroup flush={flushWidth} bordered={showBorder} listItems={myContent} />
      </Fragment>
    );
  }
}
