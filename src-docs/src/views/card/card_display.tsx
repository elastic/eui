import React from 'react';

import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSpacer,
} from '../../../../src';

export default () => (
  <div>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="l" wrap>
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type="logoLogging" />}
          onClick={() => {}}
          title="Plain"
          display="plain"
          description="This one still has a solid background color."
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          icon={<EuiIcon size="xl" type="logoLogging" />}
          title="Subdued"
          display="subdued"
          description="This one has a subdued background color."
          onClick={() => {}}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          layout="horizontal"
          icon={<EuiIcon size="xl" type="logoLogging" />}
          title="Transparent"
          display="transparent"
          description="This one doesn't have a background color anymore."
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
          icon={<EuiIcon size="xl" type="logoLogging" />}
          title="Bordered"
          display="plain"
          hasBorder
          description="This one has a plain background color and border."
          onClick={() => {}}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
