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
  'logoAerospike',
  'logoApache',
  'logoAWS',
  'logoAWSMono',
  'logoAzure',
  'logoAzureMono',
  'logoCeph',
  'logoCodesandbox',
  'logoCouchbase',
  'logoDocker',
  'logoDropwizard',
  'logoEtcd',
  'logoGCP',
  'logoGCPMono',
  'logoGithub',
  'logoGmail',
  'logoGolang',
  'logoHAproxy',
  'logoIBM',
  'logoIBMMono',
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
