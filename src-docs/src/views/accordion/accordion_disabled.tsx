import React, { useState } from 'react';

import {
  EuiAccordion,
  EuiFieldPassword,
  EuiFormRow,
  EuiPanel,
  useGeneratedHtmlId,
} from '../../../../src';

export default () => {
  const [passwordValue, setPasswordValue] = useState('');
  const disabledAccordionId = useGeneratedHtmlId({
    prefix: 'disabledAccordion',
  });

  const isInvalid = passwordValue === '';

  return (
    <EuiAccordion
      id={disabledAccordionId}
      buttonContent="Security settings"
      isDisabled={isInvalid}
      initialIsOpen={true}
    >
      <EuiPanel color="subdued">
        <EuiFormRow
          label="Password"
          isInvalid={isInvalid}
          error={['You must enter your password to save these changes.']}
        >
          <EuiFieldPassword
            isInvalid={isInvalid}
            defaultValue={passwordValue}
            onChange={(v) => setPasswordValue(v.currentTarget.value)}
          />
        </EuiFormRow>
      </EuiPanel>
    </EuiAccordion>
  );
};
