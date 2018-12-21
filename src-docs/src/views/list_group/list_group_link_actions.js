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
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flushWidth: false,
      showBorder: false,
      favorite1: undefined,
      favorite2: undefined,
      favorite3: undefined,
    };
  }

  toggleFlushWidth = () => {
    this.setState(prevState => ({ flushWidth: !prevState.flushWidth }));
  };

  toggleBorder = () => {
    this.setState(prevState => ({ showBorder: !prevState.showBorder }));
  };

  link1Clicked = () => {
    this.setState(prevState => {
      return {
        favorite1: prevState.favorite1 === 'link1' ? undefined : 'link1',
      };
    });
    if (this.favorite1 === undefined) { document.activeElement.blur(); }
  };

  link2Clicked = () => {
    this.setState(prevState => {
      return {
        favorite2: prevState.favorite2 === 'link2' ? undefined : 'link2',
      };
    });
    if (this.favorite2 === undefined) { document.activeElement.blur(); }
  };

  link3Clicked = () => {
    this.setState(prevState => {
      return {
        favorite3: prevState.favorite3 === 'link3' ? undefined : 'link3',
      };
    });
    if (this.favorite3 === undefined) { document.activeElement.blur(); }
  };

  render() {
    const {
      flushWidth,
      showBorder,
      favorite1,
      favorite2,
      favorite3,
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

        <EuiListGroup flush={flushWidth} bordered={showBorder} maxWidth={288}>
          <EuiListGroupItem
            id="link1"
            label={
              <EuiButtonEmpty
                onClick={() => window.alert('Button clicked')}
                iconType="bullseye"
                color="text"
              >
                EUI button link
              </EuiButtonEmpty>
            }
            extraAction={{
              color: 'subdued',
              onClick: this.link1Clicked,
              iconType: favorite1 === 'link1' ? 'check' : 'starEmpty',
              iconSize: 's',
              'aria-label': 'Favorite link1',
              // style: { opacity: favorite1 === 'link1' ? 1 : 0.5},
            }}
            alwaysShowAction={favorite1 === 'link1'}
          />

          <EuiListGroupItem
            id="link2"
            label={
              <EuiButtonEmpty
                onClick={() => window.alert('Button clicked')}
                iconType="beaker"
                color="text"
              >
                EUI button link
              </EuiButtonEmpty>
            }
            extraAction={{
              color: 'subdued',
              onClick: this.link2Clicked,
              iconType: favorite2 === 'link2' ? 'check' : 'starEmpty',
              iconSize: 's',
              'aria-label': 'Favorite link2',
            }}
            alwaysShowAction={favorite2 === 'link2'}
          />

          <EuiListGroupItem
            id="link3"
            label={
              <EuiButtonEmpty
                onClick={() => window.alert('Button clicked')}
                iconType="broom"
                color="text"
              >
                EUI button link
              </EuiButtonEmpty>
            }
            extraAction={{
              color: 'subdued',
              onClick: this.link3Clicked,
              iconType: favorite3 === 'link3' ? 'check' : 'starEmpty',
              iconSize: 's',
              'aria-label': 'Favorite link3',
            }}
            alwaysShowAction={favorite3 === 'link3'}
            isActive
          />

          <EuiListGroupItem
            id="link4"
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
            extraAction={{
              color: 'subdued',
              onClick: () => window.alert('Action clicked'),
              iconType: 'starEmpty',
              iconSize: 's',
              'aria-label': 'Open dummy prompt',
              isDisabled: true,
            }}
            isDisabled
          />
        </EuiListGroup>
      </Fragment>
    );
  }
}
