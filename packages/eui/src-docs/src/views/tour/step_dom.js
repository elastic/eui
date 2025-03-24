import React, { useRef, useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiText,
  EuiSpacer,
  EuiTourStep,
  EuiCode,
} from '../../../../src/components';

export default () => {
  const [isOpenRef, setIsOpenRef] = useState(false);
  const [isOpenSelector, setIsOpenSelector] = useState(false);
  const anchorRef = useRef();
  return (
    <div>
      <EuiButtonEmpty
        size="s"
        flush="left"
        iconType="refresh"
        onClick={() => {
          setIsOpenRef(true);
          setIsOpenSelector(false);
        }}
      >
        Beign tour
      </EuiButtonEmpty>
      <EuiSpacer size="m" />
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
        anchorPosition="rightCenter"
        zIndex={1}
      />
      <EuiButton color="text" aria-label="Anchor" buttonRef={anchorRef}>
        Anchor to <strong>buttonRef</strong>
      </EuiButton>

      <EuiSpacer size="xxl" />

      <EuiButtonEmpty
        size="s"
        flush="left"
        iconType="refresh"
        onClick={() => {
          setIsOpenSelector(true);
          setIsOpenRef(false);
        }}
      >
        Beign tour
      </EuiButtonEmpty>
      <EuiSpacer size="m" />
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
        anchorPosition="rightDown"
        zIndex={1}
      />
      <EuiButton color="text" aria-label="Anchor" id="anchorTarget">
        Anchor to <strong>id</strong>
      </EuiButton>
    </div>
  );
};
