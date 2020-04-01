import React, { Component } from 'react';

import { EuiListGroup, EuiListGroupItem } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite1: undefined,
      favorite2: 'link2',
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
    if (this.favorite1 === undefined) {
      document.activeElement.blur();
    }
  };

  link2Clicked = () => {
    this.setState(prevState => {
      return {
        favorite2: prevState.favorite2 === 'link2' ? undefined : 'link2',
      };
    });
    if (this.favorite2 === undefined) {
      document.activeElement.blur();
    }
  };

  link3Clicked = () => {
    this.setState(prevState => {
      return {
        favorite3: prevState.favorite3 === 'link3' ? undefined : 'link3',
      };
    });
    if (this.favorite3 === undefined) {
      document.activeElement.blur();
    }
  };

  render() {
    const { favorite1, favorite2, favorite3 } = this.state;

    return (
      <EuiListGroup maxWidth={288}>
        <EuiListGroupItem
          id="link1"
          iconType="bullseye"
          label="EUI button link"
          onClick={() => window.alert('Button clicked')}
          isActive
          extraAction={{
            color: 'subdued',
            onClick: this.link1Clicked,
            iconType: favorite1 === 'link1' ? 'starFilled' : 'starEmpty',
            iconSize: 's',
            'aria-label': 'Favorite link1',
            alwaysShow: favorite1 === 'link1',
          }}
        />

        <EuiListGroupItem
          id="link2"
          iconType="beaker"
          onClick={() => window.alert('Button clicked')}
          label="EUI button link"
          extraAction={{
            color: 'subdued',
            onClick: this.link2Clicked,
            iconType: favorite2 === 'link2' ? 'starFilled' : 'starEmpty',
            iconSize: 's',
            'aria-label': 'Favorite link2',
            alwaysShow: favorite2 === 'link2',
          }}
        />

        <EuiListGroupItem
          id="link3"
          onClick={() => window.alert('Button clicked')}
          iconType="broom"
          label="EUI button link"
          extraAction={{
            color: 'subdued',
            onClick: this.link3Clicked,
            iconType: favorite3 === 'link3' ? 'starFilled' : 'starEmpty',
            iconSize: 's',
            'aria-label': 'Favorite link3',
            alwaysShow: favorite3 === 'link3',
            isDisabled: true,
          }}
        />

        <EuiListGroupItem
          id="link4"
          iconType="brush"
          isDisabled
          label="EUI button link"
          extraAction={{
            color: 'subdued',
            onClick: () => window.alert('Action clicked'),
            iconType: 'starEmpty',
            iconSize: 's',
            'aria-label': 'Favorite link4',
          }}
        />
      </EuiListGroup>
    );
  }
}
