import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiButton,
  EuiFieldText,
  EuiFieldNumber,
  EuiAvatar,
} from '../../../../src/components/';

export default () => (
  <EuiFlexGroup style={{ maxWidth: 600 }}>
    <EuiFlexItem grow={false} style={{ width: 100 }}>
      <EuiFormRow label="Age">
        <EuiFieldNumber max={10} placeholder={42} />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiFormRow label="Full name">
        <EuiFieldText icon="user" placeholder="John Doe" />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiFormRow label="Avatar" display="center">
        <EuiAvatar name="John Doe" size="s" />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiFormRow hasEmptyLabelSpace display="center">
        <EuiButton size="s">Save</EuiButton>
      </EuiFormRow>
    </EuiFlexItem>
  </EuiFlexGroup>
);
