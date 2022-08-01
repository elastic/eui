import React, { useState } from 'react';

import {
  EuiAccordion,
  EuiFieldPassword,
  EuiFormRow,
  EuiPanel,
  EuiToolTip,
  useGeneratedHtmlId,
} from '../../../../src';

export default () => {
  const [passwordValue, setPasswordValue] = useState('');
  const disabledAccordionId = useGeneratedHtmlId({
    prefix: 'disabledAccordion',
  });

  const isInvalid = passwordValue === '';

  const buttonContent = (
    <EuiToolTip
      content={
        isInvalid ? 'There are errors in the expanded content.' : undefined
      }
    >
      <span>Security settings</span>
    </EuiToolTip>
  );

  return (
    <EuiAccordion
      id={disabledAccordionId}
      buttonContent={buttonContent}
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
