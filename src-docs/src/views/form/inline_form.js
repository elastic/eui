import React from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiButton,
  EuiFieldText,
} from '../../../../src/components/';

function makeId() {
  return Math.random().toString(36).substr(2, 5);
}

const idPrefix = makeId();

export default () => (
  <EuiFlexGroup style={{ maxWidth: 600 }}>
    <EuiFlexItem>
      <EuiFormRow label="First name"  id={idPrefix} helpText="I am helpful help text!">
        <EuiFieldText />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiFormRow label="Last name" id={idPrefix}>
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
