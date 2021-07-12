import React, { useState } from 'react';
import {
  EuiButton,
  EuiCode,
  EuiForm,
  EuiFormRow,
  EuiSwitch,
} from '../../../../src/components';

export default () => {
  const [checkedState, setCheckedState] = useState(true);

  return (
    <EuiForm component="form">
      <EuiFormRow
        label="Settings"
        helpText={
          <>
            Navigate to this Switch with a screen reader. With{' '}
            <EuiCode>hasChildLabel = false</EuiCode> the name of this is
            &ldquo;Dark mode?&rdquo; instead of &ldquo;Settings&rdquo;.
          </>
        }
        hasChildLabel={false}>
        <EuiSwitch
          name="switch"
          label="Dark mode?"
          onChange={() => {
            setCheckedState(false);
            setTimeout(() => {
              setCheckedState(true);
            }, 500);
          }}
          checked={checkedState}
        />
      </EuiFormRow>
      <EuiFormRow
        label="Your cluster data"
        helpText={
          <>
            Navigate to this Switch with a screen reader. With{' '}
            <EuiCode>hasChildLabel = true</EuiCode> the name of this switch is
            &ldquo;Your cluster data&rdquo; instead of &ldquo;Download&rdquo;.
          </>
        }>
        <EuiButton>Download</EuiButton>
      </EuiFormRow>
    </EuiForm>
  );
};
