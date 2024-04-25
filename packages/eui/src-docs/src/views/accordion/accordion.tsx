import React from 'react';

import { EuiAccordion, EuiPanel } from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const simpleAccordionId = useGeneratedHtmlId({ prefix: 'simpleAccordion' });

  return (
    <div>
      <EuiAccordion id={simpleAccordionId} buttonContent="Click me to toggle">
        <EuiPanel color="subdued">
          Any content inside of <strong>EuiAccordion</strong> will appear here.
        </EuiPanel>
      </EuiAccordion>
    </div>
  );
};
