import React from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPanel,
  EuiTitle,
} from '../../../../src/components';

export default () => (
  <>
    <EuiFlexGroup gutterSize="m" direction="row">
      <EuiFlexItem css={{ width: 240 }} grow={false}>
        <EuiPanel color="plain" hasBorder>
          <EuiTitle size="xs">
            <h4>Title of panel</h4>
          </EuiTitle>
          <EuiHorizontalRule />
          <EuiButtonEmpty flush="left">Flush left</EuiButtonEmpty>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem css={{ width: 240 }} grow={false}>
        <EuiPanel
          css={{ textAlign: 'right' }}
          color="plain"
          hasBorder
          grow={false}
        >
          <EuiButton size="s">Button</EuiButton>
          <EuiHorizontalRule />
          <EuiButtonEmpty flush="right">Flush right</EuiButtonEmpty>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  </>
);
