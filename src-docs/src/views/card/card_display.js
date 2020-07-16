import React from 'react';

import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="l">
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type="logoLogging" />}
          onClick={() => {}}
          title="Logs"
          display="plain"
          description="The Elastic Stack is the most popular open source logging platform."
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          icon={<EuiIcon size="xl" type="logoLogging" />}
          title="Logs"
          display="plain"
          description="The Elastic Stack is the most popular open source logging platform."
          onClick={() => {}}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type="logoLogging" />}
          title="Logs"
          display="plain"
          description="The Elastic Stack is the most popular open source logging platform."
          betaBadgeLabel="Beta"
          betaBadgeTooltipContent="This module is not GA. Please help us by reporting any bugs."
          onClick={() => {}}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
