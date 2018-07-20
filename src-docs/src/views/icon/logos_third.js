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
  'logoAerospike',
  'logoCeph',
  'logoCouchbase',
  'logoDropwizard',
  'logoEtcd',
  'logoHAproxy',
  'logoKafka',
  'logoMemcached',
  'logoMongodb',
  'logoOsquery',
  'logoPhp',
  'logoRabbitmq',
  'logoWindows',
  'logoDocker',
  'logoGithub',
  'logoGmail',
  'logoKubernetes',
  'logoMySQL',
  'logoNginx',
  'logoRedis',
  'logoSketch',
  'logoSlack',
  'logoWebhook',
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
