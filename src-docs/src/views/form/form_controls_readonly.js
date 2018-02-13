import React from 'react';

import {
  EuiFieldPassword,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiButton,
} from '../../../../src/components';

export default () => (
  <div>

    <EuiFlexGroup style={{ maxWidth: 600 }}>
      <EuiFlexItem>
        <EuiFormRow>
          <EuiFieldText
            readOnly
            defaultValue="example@example.com"
          />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFormRow>
          <EuiFieldPassword
            defaultValue="password"
          />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFormRow>
          <EuiButton>Save</EuiButton>
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>

  </div>
);
