import React, { useState } from 'react';

import {
  EuiAccordion,
  EuiText,
  EuiCode,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <EuiText>
        <p>
          <strong>EuiAccordion</strong> is now{' '}
          <EuiCode>{isOpen ? 'open' : 'closed'}</EuiCode>.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiAccordion
        id="accordion8"
        buttonContent="I have an `onToggle` callback"
        onToggle={setIsOpen}
        paddingSize="l">
        <EuiText>
          <p>
            Any content inside of <strong>EuiAccordion</strong> will appear
            here.
          </p>
        </EuiText>
      </EuiAccordion>
    </div>
  );
};
