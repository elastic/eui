import React, { Component } from 'react';

import { EuiIcon, EuiSideNav } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideNavOpenOnMobile: false,
      selectedItemName: null,
    };
  }

  toggleOpenOnMobile = () => {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  };

  selectItem = name => {
    this.setState({
      selectedItemName: name,
    });
  };

  createItem = (name, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      ...data,
      id: name,
      name,
      isSelected: this.state.selectedItemName === name,
      onClick: () => this.selectItem(name),
    };
  };

  render() {
    const sideNav = [
      this.createItem('Kibana', {
        icon: <EuiIcon type="logoKibana" />,
        items: [
          this.createItem('Has normal children', {
            items: [
              this.createItem('Without forceOpen', {
                items: [this.createItem('Child 1'), this.createItem('Child 2')],
              }),
            ],
          }),
          this.createItem('Normally not open', {
            items: [
              this.createItem('Has forceOpen:true', {
                forceOpen: true,
                items: [this.createItem('Child 3'), this.createItem('Child 4')],
              }),
            ],
          }),
          this.createItem('With forceOpen:true', {
            forceOpen: true,
            items: [
              this.createItem('Normal child', {
                items: [this.createItem('Child 5'), this.createItem('Child 6')],
              }),
            ],
          }),
        ],
      }),
    ];

    return (
      <EuiSideNav
        mobileTitle="Navigate within $APP_NAME"
        toggleOpenOnMobile={this.toggleOpenOnMobile}
        isOpenOnMobile={this.state.isSideNavOpenOnMobile}
        items={sideNav}
        style={{ width: 192 }}
      />
    );
  }
}
