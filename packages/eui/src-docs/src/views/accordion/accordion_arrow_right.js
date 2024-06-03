import React from 'react';

import { EuiAccordion, EuiPanel } from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const rightArrowAccordionId = useGeneratedHtmlId({
    prefix: 'rightArrowAccordion',
  });

  return (
    <EuiAccordion
      id={rightArrowAccordionId}
      arrowDisplay="right"
      buttonContent="This accordion has the arrow on the right"
    >
      <EuiPanel color="subdued">
        Any content inside of <strong>EuiAccordion</strong> will appear here.
      </EuiPanel>
    </EuiAccordion>
  );
};
