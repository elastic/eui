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

export default () => (
  <EuiFlexGroup gutterSize="l">
    <EuiFlexItem>
      <EuiCard
        icon={<EuiIcon size="xxl" type="devToolsApp" />}
        title="Developers Tools"
        description="Example of a short card description."
        footer={
          <div>
            <EuiButton aria-label="Go to Developers Tools">Go for it</EuiButton>
            <EuiSpacer size="xs" />
            <EuiText size="s">
              <p>
                Or try <EuiLink href="http://google.com">this</EuiLink>
              </p>
            </EuiText>
          </div>
        }
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        icon={<EuiIcon size="xxl" type="dashboardApp" />}
        title="Dashboards"
        description="Example of a longer card description. See how the footers stay lined up."
        footer={
          <div>
            <EuiButton aria-label="Go to Dashboards">Go for it</EuiButton>
            <EuiSpacer size="xs" />
            <EuiText size="s">
              <p>
                Or try <EuiLink href="http://google.com">this</EuiLink>
              </p>
            </EuiText>
          </div>
        }
      />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiCard
        icon={<EuiIcon size="xxl" type="savedObjectsApp" />}
        title="Save Objects"
        description="Example of a short card description."
        footer={
          <div>
            <EuiButton aria-label="Go to Save Objects">Go for it</EuiButton>
            <EuiSpacer size="xs" />
            <EuiText size="s">
              <p>
                Or try <EuiLink href="http://google.com">this</EuiLink>
              </p>
            </EuiText>
          </div>
        }
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
