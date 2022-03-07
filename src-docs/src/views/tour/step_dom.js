import React, { useRef, useState } from 'react';

import {
  EuiButtonIcon,
  EuiText,
  EuiSpacer,
  EuiTourStep,
} from '../../../../src/components';

export default () => {
  const [isOpen, setIsOpen] = useState(true);
  const anchorRef = useRef();
  return (
    <div>
      <EuiTourStep
        // anchor={() => anchorRef.current}
        anchor="#anchorTarget"
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
        anchorPosition="rightUp"
      />
      <EuiButtonIcon
        onClick={() => setIsOpen(!isOpen)}
        iconType="globe"
        aria-label="Anchor"
        buttonRef={anchorRef}
        id="anchorTarget"
      />
      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />
    </div>
  );
};
