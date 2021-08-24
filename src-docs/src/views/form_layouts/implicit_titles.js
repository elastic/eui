import React from 'react';

import {
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFilePicker,
  EuiCode,
  EuiDescribedFormGroup,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const randomId = htmlIdGenerator()();
  const titleText = 'Implicit titles';

  return (
    <EuiForm component="form">
      <EuiDescribedFormGroup
        title={<h3 id={randomId}>{titleText}</h3>}
        description={
          <>
            <strong>EuiDescribedFormGroup</strong> components tend to use this
            pattern as the title and label are usually the same.
          </>
        }
      >
        <EuiFormRow
          helpText={
            <>
              A screen reader will still know the name of this input because we
              used <EuiCode>aria-labelledby</EuiCode> here to point to the{' '}
              <strong>EuiDescribedFormGroup</strong> title <EuiCode>id</EuiCode>
              .
            </>
          }
        >
          <EuiFieldText aria-labelledby={randomId} />
        </EuiFormRow>
        <EuiFormRow
          helpText={
            <>
              Here we passed in the <strong>EuiDescribedFormGroup</strong> title
              text into a <EuiCode>aria-label</EuiCode> on{' '}
              <strong>EuiFilePicker</strong>.
            </>
          }
        >
          <EuiFilePicker aria-label={titleText} />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    </EuiForm>
  );
};
