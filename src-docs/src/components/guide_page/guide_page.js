import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

import {
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBetaBadge,
  EuiTab,
  EuiTabs,
  EuiHorizontalRule,
} from '../../../../src/components';

export const GuidePage = ({
  children,
  title,
  intro,
  isBeta,
  playground,
  guidelines,
}) => {
  const betaBadge = isBeta ? (
    <EuiBetaBadge
      label="Beta"
      tooltipContent="This component is still under development and may contain breaking changes in the nearby future."
    />
  ) : (
    undefined
  );

  const tabs = [
    {
      id: 'examples',
      name: 'Examples',
    },
  ];
  if (playground)
    tabs.push({
      id: 'playground',
      name: 'Playground',
    });
  if (guidelines)
    tabs.push({
      id: 'guidelines',
      name: 'Guidelines',
    });

  const [selectedTabId, setSelectedTabId] = useState('examples');

  const onSelectedTabChanged = id => {
    setSelectedTabId(id);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <EuiTab
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        key={index}>
        {tab.name}
      </EuiTab>
    ));
  };

  return (
    <Fragment>
      <div className="guideSection__text">
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiTitle size="l">
              <h1>
                {title} {betaBadge}
              </h1>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiTabs display="condensed">
              {tabs.length > 1 && renderTabs()}
            </EuiTabs>
          </EuiFlexItem>
        </EuiFlexGroup>

        {tabs.length > 1 && <EuiHorizontalRule />}

        <EuiSpacer size="m" />

        {selectedTabId === 'examples' && intro}
      </div>

      {selectedTabId === 'examples' && children}
      {selectedTabId === 'playground' && playground}
      {selectedTabId === 'guidelines' && guidelines}

      {/* Give some space between the bottom of long content and the bottom of the screen */}
      <EuiSpacer size="xl" />
    </Fragment>
  );
};

GuidePage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  intro: PropTypes.node,
  componentLinkTo: PropTypes.string,
  isBeta: PropTypes.bool,
};
