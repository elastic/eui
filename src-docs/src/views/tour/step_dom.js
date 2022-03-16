import React, { useRef, useState } from 'react';

import {
  EuiButtonIcon,
  EuiText,
  EuiSpacer,
  EuiTourStep,
  EuiCode,
} from '../../../../src/components';

export default () => {
  const [isOpen, setIsOpen] = useState(true);
  const anchorRef = useRef();
  return (
    <div>
      <EuiTourStep
        anchor={() => anchorRef.current}
        content={
          <EuiText>
            <p>
              Popover is attached to the <EuiCode>#anchor</EuiCode> button
            </p>
          </EuiText>
        }
        isStepOpen={isOpen}
        minWidth={300}
        onFinish={() => setIsOpen(false)}
        step={1}
        stepsTotal={1}
        title="DOM selector as anchor location"
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
