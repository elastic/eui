// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS
// DON'T USE THIS

// This example JS is overly complex for simple icon usage
// and is set up this way for ease of use in our docs.
//
// Check the snippet tab for a more common usage.

import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
  EuiCopy,
} from '../../../../src/components';

const iconTypes = [
  'logoAppSearch',
  'logoBeats',
  'logoBusinessAnalytics',
  'logoCode',
  'logoCloud',
  'logoCloudEnterprise',
  'logoElastic',
  'logoElasticStack',
  'logoElasticsearch',
  'logoKibana',
  'logoLogging',
  'logoLogstash',
  'logoMaps',
  'logoMetrics',
  'logoObservability',
  'logoSecurity',
  'logoSiteSearch',
  'logoUptime',
  'logoWorkplaceSearch',
].sort();

export default () => (
  <EuiFlexGrid columns={4}>
    {iconTypes.map(iconType => (
      <EuiFlexItem
        className="guideDemo__icon"
        key={iconType}
        style={{ width: '200px' }}>
        <EuiCopy textToCopy={iconType} afterMessage={`${iconType} copied`}>
          {copy => (
            <EuiPanel onClick={copy} className="eui-textCenter">
              <EuiIcon type={iconType} size="xl" />
              <EuiText size="s">
                <p>{iconType}</p>
              </EuiText>
            </EuiPanel>
          )}
        </EuiCopy>
      </EuiFlexItem>
    ))}
  </EuiFlexGrid>
);
