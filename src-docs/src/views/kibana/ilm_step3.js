import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiCard,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

const dataSources = [
  { name: 'Apache logs', icon: 'logoApache' },
  { name: 'Apache metrics', icon: 'logoApache' },
  { name: 'Redis', icon: 'logoRedis' },
  { name: 'Nginx logs', icon: 'logoNginx' },
  { name: 'Nginx metrics', icon: 'logoNginx' },
  { name: 'Kubernetes', icon: 'logoKubernetes' },
  { name: 'MySQL', icon: 'logoMySQL' },
  { name: 'Docker', icon: 'logoDocker' }
];

export const Step3 = ({
  onSelection,
}) => {
  return (
    <div className="euiAnimateContentLoad">
      <EuiTitle>
        <h4>Edit common policy options</h4>
      </EuiTitle>
      <EuiSpacer />
      <EuiFlexGrid columns={4}>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="xxl" type="logoElasticSearch" />}
            title="Custom"
            description="Your data is unique and lives in Elasticsearch"
            onClick={onSelection}
          />
        </EuiFlexItem>
        {
          dataSources.map(item => (
            <EuiFlexItem
              key={item.icon}
            >
              <EuiCard
                icon={<EuiIcon size="xxl" type={item.icon} />}
                title={item.name}
                description="Is a description needed here? Maybe?"
                onClick={onSelection}
              />
            </EuiFlexItem>
          ))
        }
      </EuiFlexGrid>
    </div>
  );
};
