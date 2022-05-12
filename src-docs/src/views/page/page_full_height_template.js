import React from 'react';

import {
  EuiPageTemplate,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
} from '../../../../src/components';

export default ({ button = <></>, content }) => (
  <EuiPageTemplate fullHeight template="empty">
    <EuiFlexGroup
      className="eui-fullHeight"
      gutterSize="none"
      direction="column"
      responsive={false}
    >
      <EuiFlexItem grow={false}>
        <EuiPanel color="danger" />
      </EuiFlexItem>
      <EuiSpacer size="l" />
      <EuiFlexItem className="eui-fullHeight">
        <EuiFlexGroup className="eui-fullHeight" gutterSize="l">
          <EuiFlexItem grow={2}>
            <EuiPanel tabIndex={0} className="eui-yScroll" hasShadow={false}>
              {content}
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel hasShadow={false} />
            <EuiSpacer />
            {button}
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  </EuiPageTemplate>
);
