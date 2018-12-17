import React, { Component, Fragment } from 'react';

import {
  EuiListGroup,
  EuiListGroupItem,
  EuiSpacer,
  EuiSwitch,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiButtonIcon,
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

        <EuiListGroup flush={flushWidth} bordered={showBorder} style={{ maxWidth: '288px' }}>
          <EuiListGroupItem
            label={
              <EuiButtonEmpty
                onClick={() => window.alert('Button clicked')}
                iconType="bullseye"
                color="text"
              >
                EUI button link
              </EuiButtonEmpty>
            }
            linkAction={
              <EuiButtonIcon
                color="subdued"
                onClick={() => window.alert('Action clicked')}
                iconType="starEmpty"
                iconSize="s"
                aria-label="Open dummy prompt"
              />
            }
          />

          <EuiListGroupItem
            label={
              <EuiButtonEmpty
                onClick={() => window.alert('Button clicked')}
                iconType="beaker"
                color="text"
              >
                EUI button link
              </EuiButtonEmpty>
            }
            linkAction={
              <EuiButtonIcon
                color="subdued"
                onClick={() => window.alert('Action clicked')}
                iconType="starEmpty"
                iconSize="s"
                aria-label="Open dummy prompt"
              />
            }
          />

          <EuiListGroupItem
            label={
              <EuiButtonEmpty
                onClick={() => window.alert('Button clicked')}
                iconType="broom"
                color="text"
              >
                EUI button link
              </EuiButtonEmpty>
            }
            linkAction={
              <EuiButtonIcon
                color="subdued"
                onClick={() => window.alert('Action clicked')}
                iconType="starEmpty"
                iconSize="s"
                aria-label="Open dummy prompt"
              />
            }
            isActive
          />

          <EuiListGroupItem
            label={
              <EuiButtonEmpty
                onClick={() => window.alert('Button clicked')}
                iconType="brush"
                color="text"
                isDisabled
              >
                EUI button link
              </EuiButtonEmpty>
            }
            linkAction={
              <EuiButtonIcon
                color="subdued"
                onClick={() => window.alert('Action clicked')}
                iconType="starEmpty"
                iconSize="s"
                aria-label="Open dummy prompt"
                isDisabled
              />
            }
            isDisabled
          />
        </EuiListGroup>
      </Fragment>
    );
  }
}
