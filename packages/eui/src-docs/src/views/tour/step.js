import React, { useState } from 'react';

import {
  EuiButtonEmpty,
  EuiFieldText,
  EuiText,
  EuiSpacer,
  EuiTourStep,
} from '../../../../src/components';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  const beginTour = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <EuiButtonEmpty
        size="s"
        flush="left"
        iconType="refresh"
        onClick={beginTour}
      >
        Begin tour
      </EuiButtonEmpty>
      <EuiSpacer size="m" />
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
        subtitle="Title of the full tour (optional)"
        anchorPosition="rightCenter"
        zIndex={1}
      >
        <EuiFieldText placeholder="Placeholder text" />
      </EuiTourStep>
    </div>
  );
};
