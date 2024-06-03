import React from 'react';

import {
  EuiSpacer,
  EuiPanel,
  EuiListGroupItem,
  EuiListGroup,
} from '../../../../src/components/';
import { EuiThemeProvider } from '../../../../src/services';

export default () => (
  <>
    <EuiListGroup>
      <EuiListGroupItem href="#" label="Text by default (xs)" size="xs" />

      <EuiListGroupItem
        onClick={() => {}}
        label="Primary (s)"
        color="primary"
        size="s"
      />

      <EuiListGroupItem href="#" label="Text (m)" color="text" />

      <EuiListGroupItem href="#" label="Subdued (l)" color="subdued" size="l" />
    </EuiListGroup>

    <EuiSpacer size="s" />

    <EuiThemeProvider colorMode="dark">
      <EuiPanel borderRadius="none" hasShadow={false} color="subdued">
        <EuiListGroup>
          <EuiListGroupItem href="#" label="Ghost" />
        </EuiListGroup>
      </EuiPanel>
    </EuiThemeProvider>
  </>
);
