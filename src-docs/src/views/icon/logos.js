import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
} from '../../../../src/components';

const iconTypes = [
  'logoApache',
  'logoBeats',
  'logoCloud',
  'logoDocker',
  'logoElastic',
  'logoElasticSearch',
  'logoElasticStack',
  'logoGithub',
  'logoGmail',
  'logoKibana',
  'logoKubernetes',
  'logoLogstash',
  'logoMySQL',
  'logoNginx',
  'logoRedis',
  'logoSketch',
  'logoSlack',
  'logoWebhook',
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
          <EuiPanel>
            <EuiIcon
              type={iconType}
              size="xl"
            />
            <EuiText size="s">
              <p>{iconType}</p>
            </EuiText>
          </EuiPanel>
        </EuiFlexItem>
      ))
    }
  </EuiFlexGrid>
);
