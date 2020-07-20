import React, { useState, Fragment } from 'react';

import {
  EuiIcon,
  EuiTabs,
  EuiTab,
  EuiSpacer,
} from '../../../../src/components';

const tabs = [
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
    name: (
      <span>
        <EuiIcon type="heatmap" />
        &nbsp;Hydrogen
      </span>
    ),
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

export default () => {
  const [selectedTabId, setSelectedTabId] = useState('cobalt');

  const onSelectedTabChanged = id => {
    setSelectedTabId(id);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <EuiTab
        {...tab.href && { href: tab.href, target: '_blank' }}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        key={index}>
        {tab.name}
      </EuiTab>
    ));
  };

  return (
    <Fragment>
      <EuiTabs>{renderTabs()}</EuiTabs>

      <EuiSpacer />

      <EuiTabs size="s">{renderTabs()}</EuiTabs>
    </Fragment>
  );
};
