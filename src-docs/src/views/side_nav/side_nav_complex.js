import React, { Component } from 'react';

import { EuiIcon, EuiSideNav } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideNavOpenOnMobile: false,
      selectedItemName: 'Lion stuff',
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
      this.createItem('Elasticsearch', {
        icon: <EuiIcon type="logoElasticsearch" />,
        items: [
          this.createItem('Data sources'),
          this.createItem('Users'),
          this.createItem('Roles'),
          this.createItem('Watches'),
          this.createItem(
            'Extremely long title will become truncated when the browser is narrow enough'
          ),
        ],
      }),
      this.createItem('Kibana', {
        icon: <EuiIcon type="logoKibana" />,
        items: [
          this.createItem('Advanced settings', {
            items: [
              this.createItem('General'),
              this.createItem('Timelion', {
                items: [
                  this.createItem('Time stuff', {
                    icon: <EuiIcon type="clock" />,
                  }),
                  this.createItem('Lion stuff', {
                    icon: <EuiIcon type="stats" />,
                  }),
                ],
              }),
              this.createItem('Visualizations'),
            ],
          }),
          this.createItem('Index Patterns'),
          this.createItem('Saved Objects'),
          this.createItem('Reporting'),
        ],
      }),
      this.createItem('Logstash', {
        icon: <EuiIcon type="logoLogstash" />,
        items: [this.createItem('Pipeline viewer')],
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
