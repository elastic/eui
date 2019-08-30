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
        href: '',
      },
      {
        id: 'dextrose',
        name: 'Dextrose',
        disabled: false,
        href: '',
      },
      {
        id: 'hydrogen',
        name: 'Hydrogen',
        disabled: true,
        href: '',
      },
      {
        id: 'monosodium_glutammate',
        name: 'Monosodium Glutamate',
        disabled: false,
        href: '',
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
    return this.tabs.map((tab, index) => {
      return !tab.href ? (
        <EuiTab
          onClick={() => this.onSelectedTabChanged(tab.id)}
          isSelected={tab.id === this.state.selectedTabId}
          disabled={tab.disabled}
          key={index}>
          {tab.name}
        </EuiTab>
      ) : (
        <EuiTab
          href={tab.href}
          key={index}
          target="_blank"
          disabled={tab.disabled}>
          {tab.name}
        </EuiTab>
      );
    });
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
