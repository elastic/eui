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
        ratio="third"
        title={<h2>Ratio of thirds</h2>}
        description={
          <Fragment>
            The title and description will shrink to fit inside the left side
            but retains a readable minimum width.
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
