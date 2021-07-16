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
        hasChildLabel={false}
        helpText={
          <>
            Navigate to this Switch with a screen reader. With{' '}
            <EuiCode>hasChildLabel = false</EuiCode> the name of this is
            &ldquo;Dark mode?&rdquo; instead of &ldquo;Settings&rdquo;.
          </>
        }>
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
        hasChildLabel={false}
        helpText={
          <>
            Navigate to this button with a screen reader. With{' '}
            <EuiCode>hasChildLabel = false</EuiCode> the name of this button is
            &ldquo;Download&rdquo; instead of &ldquo;Your cluster data&rdquo;.
          </>
        }>
        <EuiButton>Download</EuiButton>
      </EuiFormRow>
    </EuiForm>
  );
};
