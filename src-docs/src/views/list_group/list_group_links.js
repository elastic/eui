import React, { Component, Fragment } from 'react';

import {
  EuiListGroup,
  EuiSpacer,
  EuiSwitch,
  EuiCode,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

const myContent = [
  {
    label: <EuiText size="s">My first link</EuiText>,
    href: window.location.href,
  },
  {
    label: <EuiText size="s">My second link</EuiText>,
    href: window.location.href,
    isActive: true,
  },
  {
    label: <EuiText size="s">My third link</EuiText>,
    href: window.location.href,
    isDisabled: true,
  },
  {
    label: <EuiText size="s">My fourth link</EuiText>,
    href: window.location.href,
  },
  {
    label: <EuiText size="s">My fifth link</EuiText>,
    href: window.location.href,
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
