import React, { useState } from 'react';

import {
  EuiLink,
  EuiText,
  EuiSpacer,
  EuiTourStep,
} from '../../../../src/components';

export default () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <EuiTourStep
        content={
          <EuiText>
            <p>The tour step content.</p>
          </EuiText>
        }
        isStepOpen={isOpen}
        minWidth={300}
        onFinish={() => setIsOpen(false)}
        step={1}
        stepsTotal={1}
        title="Title of the current step"
        subtitle="Title of the full tour"
        anchorPosition="rightUp"
      >
        <EuiText>
          The tour step{' '}
          <EuiLink onClick={() => setIsOpen(!isOpen)}>anchor point</EuiLink>.
        </EuiText>
      </EuiTourStep>
      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />
    </div>
  );
};
