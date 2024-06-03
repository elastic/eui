import React, { Fragment } from 'react';

import {
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiDescribedFormGroup,
  EuiFilePicker,
} from '../../../../src';

export default () => {
  return (
    <EuiForm component="form">
      <EuiDescribedFormGroup
        fullWidth
        title={<h2>Full width</h2>}
        description={
          <Fragment>
            The title and description will grow to fill the left side column at
            any width. Be mindful that it doesn&apos;t get too wide.
          </Fragment>
        }
      >
        <EuiFormRow
          fullWidth
          label="Text field"
          helpText={
            <span>
              Be sure to add fullWidth to EuiFormRow and nested fields.
            </span>
          }
        >
          <EuiFieldText fullWidth name="first" aria-label="Example" />
        </EuiFormRow>

        <EuiFormRow fullWidth label="File picker">
          <EuiFilePicker fullWidth />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    </EuiForm>
  );
};
