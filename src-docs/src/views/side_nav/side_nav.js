import React, { Component } from 'react';

import { EuiSideNav } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideNavOpenOnMobile: false,
    };
  }

  toggleOpenOnMobile = () => {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  };

  render() {
    const sideNav = [
      {
        name: 'Kibana',
        id: 0,
        items: [
          {
            name: 'Advanced settings',
            id: 1,
            onClick: () => {
              window.alert('Advanced settings');
            },
          },
          {
            name: 'Index Patterns (link)',
            id: 2,
            href: 'http://www.elastic.co',
          },
          {
            name: 'Saved Objects',
            id: 3,
            onClick: () => {
              window.alert('Saved Objects');
            },
            isSelected: true,
          },
          {
            name: 'Reporting',
            id: 4,
            onClick: () => {
              window.alert('Reporting');
            },
          },
        ],
      },
    ];

    return (
      <EuiSideNav
        mobileTitle="Navigate within $APP_NAME"
        toggleOpenOnMobile={this.toggleOpenOnMobile}
        isOpenOnMobile={this.state.isSideNavOpenOnMobile}
        style={{ width: 192 }}
        items={sideNav}
      />
    );
  }
}
