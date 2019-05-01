import React from 'react';

import {
  EuiButton,
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

const cardFooterContent = (
  <div>
    <EuiButton>Go for it</EuiButton>
    <EuiSpacer size="xs" />
    <EuiText size="s">
      <p>
        Or try <EuiLink>this</EuiLink>
      </p>
    </EuiText>
  </div>
);

export default () => (
  <EuiFlexGroup gutterSize="l">
    <EuiFlexItem>
      <EuiCard
        icon={<EuiIcon size="xxl" type="devToolsApp" />}
        title="Developers Tools"
        description="Example of a short card description."
        footer={cardFooterContent}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        icon={<EuiIcon size="xxl" type="dashboardApp" />}
        title="Dashboards"
        description="Example of a longer card description. See how the footers stay lined up."
        footer={cardFooterContent}
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        icon={<EuiIcon size="xxl" type="savedObjectsApp" />}
        title="Save Objects"
        description="Example of a short card description."
        footer={cardFooterContent}
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
