import React, { Fragment, useState } from 'react';

import {
  EuiCode,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiDescribedFormGroup,
  EuiSwitch,
} from '../../../../src/components';

export default () => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  return (
    <EuiForm component="form">
      <EuiDescribedFormGroup
        title={<h2>Full width</h2>}
        titleSize="xxxs"
        description={
          <Fragment>
            By default, <strong>EuiDescribedFormGroup</strong> will be double
            the default width of form elements. However, you can pass{' '}
            <EuiCode>fullWidth</EuiCode> prop to this, the individual field and
            row components to expand to their container.
          </Fragment>
        }
        fullWidth
      >
        <EuiFormRow
          label="Use a switch instead of a single checkbox"
          hasChildLabel={false}
          fullWidth
        >
          <EuiSwitch
            name="switch"
            label="Setting name"
            checked={isSwitchChecked}
            onChange={onSwitchChange}
          />
        </EuiFormRow>

        <EuiFormRow fullWidth>
          <EuiFieldText
            name="second"
            fullWidth
            aria-label="An example of EuiTextField with fullWidth"
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    </EuiForm>
  );
};
