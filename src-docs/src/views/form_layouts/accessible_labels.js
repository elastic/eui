import React, { useState } from 'react';
import {
  EuiButton,
  EuiCode,
  EuiDescribedFormGroup,
  EuiForm,
  EuiFormRow,
  EuiSwitch,
} from '../../../../src/components';

export default () => {
  const [checkedState, setCheckedState] = useState(true);

  return (
    <EuiForm component="form">
      <EuiDescribedFormGroup
        title={<h3>Not as simple as they look</h3>}
        description={
          <>
            Some form controls come with their own label and don&lsquo;t need
            the one provided by <strong>EuiFormRow</strong>. Include{' '}
            <EuiCode>hasChildLabel:false</EuiCode> on form rows that wrap:{' '}
            <EuiCode>EuiSwitch</EuiCode>, <EuiCode>EuiButton</EuiCode>, or{' '}
            <EuiCode>EuiLink</EuiCode>.
          </>
        }>
        <EuiFormRow
          label="Settings"
          helpText={
            <>
              Navigate to this Switch with a screen reader - with{' '}
              <EuiCode>hasChildLabel:false</EuiCode> the name of this is
              &rdquo;Dark mode?&ldquo; instead of &rdquo;Settings&ldquo;.
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
              Navigate to this Switch with a screen reader - without{' '}
              <EuiCode>hasChildLabel:false</EuiCode> the name of this switch is
              &rdquo;Your cluster data&ldquo; instead of &rdquo;Download&ldquo;.
            </>
          }>
          <EuiButton>Download</EuiButton>
        </EuiFormRow>
      </EuiDescribedFormGroup>
    </EuiForm>
  );
};
