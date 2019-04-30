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
  'logoAPM',
  'logoAppSearch',
  'logoBeats',
  'logoBusinessAnalytics',
  'logoCloud',
  'logoCloudEnterprise',
  'logoElastic',
  'logoElasticStack',
  'logoElasticsearch',
  'logoEnterpriseSearch',
  'logoKibana',
  'logoLogstash',
  'logoMetrics',
  'logoSiteSearch',
  'logoXpack',
].sort();

export default () => (
  <EuiFlexGrid columns={4}>
    {
      iconTypes.map(iconType => (
        <EuiFlexItem
          className="guideDemo__icon"
          key={iconType}
          style={{ width: '200px' }}
        >
          <EuiCopy
            textToCopy={iconType}
            afterMessage={`${iconType} copied`}
          >
            {(copy) => (
              <EuiPanel
                onClick={copy}
                className="eui-textCenter"
              >
                <EuiIcon
                  type={iconType}
                  size="xl"
                />
                <EuiText size="s">
                  <p>{iconType}</p>
                </EuiText>
              </EuiPanel>
            )}
          </EuiCopy>
        </EuiFlexItem>
      ))
    }
  </EuiFlexGrid>
);
