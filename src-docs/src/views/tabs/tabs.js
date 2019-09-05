import React, { Component, Fragment } from 'react';

import { EuiTabs, EuiTab, EuiSpacer } from '../../../../src/components';

class EuiTabsExample extends Component {
  constructor(props) {
    super(props);

    this.tabs = [
      {
        id: 'cobalt',
        name: 'Cobalt',
        disabled: false,
      },
      {
        id: 'dextrose',
        name: 'Dextrose',
        disabled: false,
      },
      {
        id: 'hydrogen',
        name: 'Hydrogen',
        disabled: true,
      },
      {
        id: 'monosodium_glutammate',
        name: 'Monosodium Glutamate',
        disabled: false,
      },
      {
        id: 'elastic_link',
        name: 'Elastic Website',
        disabled: false,
        href: 'https://www.elastic.co/',
      },
    ];

    this.state = {
      selectedTabId: 'cobalt',
    };
  }

  onSelectedTabChanged = id => {
    this.setState({
      selectedTabId: id,
    });
  };

  renderTabs() {
    return this.tabs.map((tab, index) => (
      <EuiTab
        {...tab.href && { href: tab.href, target: '_blank' }}
        onClick={() => this.onSelectedTabChanged(tab.id)}
        isSelected={tab.id === this.state.selectedTabId}
        disabled={tab.disabled}
        key={index}>
        {tab.name}
      </EuiTab>
    ));
  }

  render() {
    return (
      <Fragment>
        <EuiTabs>{this.renderTabs()}</EuiTabs>

        <EuiSpacer />

        <EuiTabs size="s">{this.renderTabs()}</EuiTabs>
      </Fragment>
    );
  }
}

export default EuiTabsExample;
