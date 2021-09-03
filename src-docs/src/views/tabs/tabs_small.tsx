import React, { useState } from 'react';

import {
  EuiIcon,
  EuiTabs,
  EuiTab,
  EuiButton,
  EuiPopover,
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
    name: 'Hydrogen',
    prepend: <EuiIcon type="heatmap" size="s" />,
    disabled: true,
  },
];

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);
  const [selectedTabId, setSelectedTabId] = useState('cobalt');

  const onSelectedTabChanged = (id: string) => {
    setSelectedTabId(id);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <EuiTab
        key={index}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        prepend={tab.prepend}
      >
        {tab.name}
      </EuiTab>
    ));
  };

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const button = (
    <EuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Click to show small tabs in a popover
    </EuiButton>
  );

  return (
    <EuiPopover
      id="contentPanel"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      anchorPosition="downLeft"
    >
      <div style={{ width: 300 }}>
        <EuiTabs size="s" expand>
          {renderTabs()}
        </EuiTabs>
        <EuiSpacer size="m" /> A spacer is usually needed between the tabs and
        the content. Try to use the same size as the surrounding padding.
      </div>
    </EuiPopover>
  );
};
