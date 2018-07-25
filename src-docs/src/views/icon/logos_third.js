import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
} from '../../../../src/components';

const iconTypes = [
  'logoAerospike',
  'logoApache',
  'logoCeph',
  'logoCouchbase',
  'logoDocker',
  'logoDropwizard',
  'logoEtcd',
  'logoGithub',
  'logoGmail',
  'logoGolang',
  'logoHAproxy',
  'logoKafka',
  'logoKubernetes',
  'logoMemcached',
  'logoMongodb',
  'logoMySQL',
  'logoNginx',
  'logoOsquery',
  'logoPhp',
  'logoPostgres',
  'logoPrometheus',
  'logoRabbitmq',
  'logoRedis',
  'logoSketch',
  'logoSlack',
  'logoWebhook',
  'logoWindows',
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
