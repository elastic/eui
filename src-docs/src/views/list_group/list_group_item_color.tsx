import React from 'react';

import {
  EuiListGroupItem,
  EuiListGroup,
} from '../../../../src/components/list_group';

export default () => (
  <EuiListGroup>
    <EuiListGroupItem href="#" label="Inherit by default (xs)" size="xs" />

    <EuiListGroupItem
      onClick={() => {}}
      label="Primary (s)"
      color="primary"
      size="s"
    />

    <EuiListGroupItem href="#" label="Text (m)" color="text" />

    <EuiListGroupItem href="#" label="Subdued (l)" color="subdued" size="l" />

    <EuiListGroupItem
      href="#"
      label="Ghost"
      color="ghost"
      style={{ background: 'black' }}
    />
  </EuiListGroup>
);
