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
      <EuiFormRow label="Age" compressed>
        <EuiFieldNumber max={10} placeholder={42} compressed />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiFormRow label="Full name" compressed>
        <EuiFieldText icon="user" placeholder="John Doe" compressed />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiFormRow label="Avatar" display="centerCompressed">
        <EuiAvatar name="John Doe" size="s" />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiFormRow hasEmptyLabelSpace displayOnly compressed>
        <EuiButton size="s">Save</EuiButton>
      </EuiFormRow>
    </EuiFlexItem>
  </EuiFlexGroup>
);
