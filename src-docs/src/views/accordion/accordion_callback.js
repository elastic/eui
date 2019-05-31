import React from 'react';

import { EuiAccordion, EuiText, EuiCode } from '../../../../src/components';

export default () => (
  <div>
    <EuiAccordion
      id="accordion1"
      buttonContent="I have an `onToggle` callback"
      onToggle={isOpen =>
        console.log(`EuiAccordion is now ${isOpen ? 'open' : 'closed'}`)
      }
      paddingSize="l">
      <EuiText>
        <p>
          Any content inside of <EuiCode>EuiAccordion</EuiCode> will appear
          here.
        </p>
      </EuiText>
    </EuiAccordion>
  </div>
);
