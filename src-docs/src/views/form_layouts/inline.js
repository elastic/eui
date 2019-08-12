import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiButton,
  EuiFieldText,
} from '../../../../src/components/';

export default () => (
  <EuiFlexGroup style={{ maxWidth: 600 }}>
    <EuiFlexItem>
      <EuiFormRow label="First name" helpText="I am helpful help text!">
        <EuiFieldText />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiFormRow label="Last name">
        <EuiFieldText />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiFormRow hasEmptyLabelSpace>
        <EuiButton>Save</EuiButton>
      </EuiFormRow>
    </EuiFlexItem>
  </EuiFlexGroup>
);
