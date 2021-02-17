import React from 'react';

import { EuiSplitPanel } from '../../../../src/components/panel';
import { EuiText } from '../../../../src/components/text';

export default () => (
  <EuiSplitPanel>
    {(InnerPanel) => (
      <>
        <InnerPanel>
          <EuiText>
            <p>Top panel</p>
          </EuiText>
        </InnerPanel>
        <InnerPanel color="subdued">
          <EuiText>
            <p>Bottom panel</p>
          </EuiText>
        </InnerPanel>
      </>
    )}
  </EuiSplitPanel>
);
