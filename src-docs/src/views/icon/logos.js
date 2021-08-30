import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiCodeBlock,
  EuiSpacer,
  EuiCopy,
} from '../../../../src/components';

export const iconTypes = [
  'logoAppSearch',
  'logoBeats',
  'logoBusinessAnalytics',
  'logoCode',
  'logoCloud',
  'logoCloudEnterprise',
  'logoElastic',
  'logoElasticStack',
  'logoElasticsearch',
  'logoEnterpriseSearch',
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
  <>
    <EuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<EuiIcon type="logoElasticsearch" size="xl" />'}
    </EuiCodeBlock>
    <EuiSpacer />
    <EuiFlexGrid direction="column" columns={3}>
      {iconTypes.map((iconType) => (
        <EuiFlexItem key={iconType}>
          <EuiCopy
            display="block"
            textToCopy={iconType}
            afterMessage={`${iconType} copied`}
          >
            {(copy) => (
              <EuiPanel
                hasShadow={false}
                hasBorder={false}
                onClick={copy}
                paddingSize="s"
              >
                <EuiIcon
                  className="eui-alignMiddle"
                  type={iconType}
                  size="xl"
                />{' '}
                &emsp; <small>{iconType}</small>
              </EuiPanel>
            )}
          </EuiCopy>
        </EuiFlexItem>
      ))}
    </EuiFlexGrid>
  </>
);
