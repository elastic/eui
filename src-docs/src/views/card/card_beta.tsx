import React from 'react';

import {
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup gutterSize="l">
    <EuiFlexItem>
      <EuiCard
        icon={<EuiIcon size="xxl" type="dashboardApp" />}
        title="Dashboards"
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => {}}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        icon={<EuiIcon size="xxl" type="monitoringApp" />}
        title="Monitoring"
        description="Example of a card's description. Stick to one or two sentences."
        betaBadgeProps={{
          label: 'Beta',
          tooltipContent:
            'This module is not GA. Please help us by reporting any bugs.',
        }}
        onClick={() => {}}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        icon={<EuiIcon size="xxl" type="lensApp" />}
        title="Lens"
        isDisabled
        description="Disabled cards can have active links using EuiBetaBadge."
        betaBadgeProps={{
          href: 'http://www.elastic.co/subscriptions',
          target: '_blank',
          label: 'Basic',
          tooltipContent: 'This feature requires a Basic License',
        }}
        onClick={() => {}}
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
