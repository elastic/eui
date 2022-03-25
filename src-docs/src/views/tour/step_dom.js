import React, { useRef, useState } from 'react';

import {
  EuiButtonIcon,
  EuiText,
  EuiSpacer,
  EuiTourStep,
  EuiCode,
} from '../../../../src/components';

export default () => {
  const [isOpenRef, setIsOpenRef] = useState(true);
  const [isOpenSelector, setIsOpenSelector] = useState(true);
  const anchorRef = useRef();
  return (
    <div>
      <EuiTourStep
        anchor={() => anchorRef.current}
        content={
          <EuiText>
            <p>
              Popover is attached to the <EuiCode>anchorRef</EuiCode> button
            </p>
          </EuiText>
        }
        isStepOpen={isOpenRef}
        minWidth={300}
        onFinish={() => setIsOpenRef(false)}
        step={1}
        stepsTotal={1}
        title="React ref as anchor location"
        anchorPosition="rightDown"
      />
      <EuiButtonIcon
        onClick={() => setIsOpenRef(!isOpenRef)}
        iconType="globe"
        aria-label="Anchor"
        buttonRef={anchorRef}
      />

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <EuiTourStep
        anchor="#anchorTarget"
        content={
          <EuiText>
            <p>
              Popover is attached to the <EuiCode>#anchorTarget</EuiCode> button
            </p>
          </EuiText>
        }
        isStepOpen={isOpenSelector}
        minWidth={300}
        onFinish={() => setIsOpenSelector(false)}
        step={1}
        stepsTotal={1}
        title="DOM selector as anchor location"
        anchorPosition="rightUp"
      />
      <EuiButtonIcon
        onClick={() => setIsOpenSelector(!isOpenSelector)}
        iconType="globe"
        aria-label="Anchor"
        id="anchorTarget"
      />
      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />
    </div>
  );
};
