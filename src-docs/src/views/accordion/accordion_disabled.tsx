import React from 'react';

import { EuiAccordion, EuiFieldText, EuiFormRow, EuiSpacer } from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const disabledAccordionId = useGeneratedHtmlId({ prefix: 'disabledAccordion' });

  return (
    <div>
<EuiAccordion
  id={disabledAccordionId}
  buttonContent="Security settings"
  arrowProps={{ disabled: true }}
  buttonProps={{ disabled: true }}
  initialIsOpen={true}
>
        <EuiSpacer size="s" />
        <EuiFormRow
          label="Password"
          isInvalid={true}
          error={[
            "You must enter your password to save these changes.",
          ]}
        >
          <EuiFieldText name="text" isInvalid={true} />
        </EuiFormRow>
      </EuiAccordion>
    </div>
  );
};
