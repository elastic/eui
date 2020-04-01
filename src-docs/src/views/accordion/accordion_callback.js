import React from 'react';

import { EuiAccordion, EuiText } from '../../../../src/components';

export default () => (
  <div>
    <EuiAccordion
      id="accordion8"
      buttonContent="I have an `onToggle` callback"
      onToggle={isOpen =>
        console.log(`EuiAccordion is now ${isOpen ? 'open' : 'closed'}`)
      }
      paddingSize="l">
      <EuiText>
        <p>
          Any content inside of <strong>EuiAccordion</strong> will appear here.
        </p>
      </EuiText>
    </EuiAccordion>
  </div>
);
