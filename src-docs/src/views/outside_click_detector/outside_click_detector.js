import React, { useState } from 'react';

import {
  EuiButton,
  EuiOutsideClickDetector,
  EuiSpacer,
  EuiCallOut,
} from '../../../../src/components';

let timer = null;

export default () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [showCallOut, setShowCallOut] = useState(false);

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const outsideClickHandler = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      setShowCallOut(false);
      timer = null;
    }, 500);

    setShowCallOut(true);
  };

  return (
    <div>
      <EuiOutsideClickDetector
        onOutsideClick={() => {
          outsideClickHandler();
        }}
        isDisabled={isDisabled}>
        <p>
          {isDisabled
            ? 'This detector is disabled, so clicking outside will do nothing.'
            : 'Clicking inside here will do nothing, but clicking outside will trigger an alert.'}
        </p>
      </EuiOutsideClickDetector>

      <EuiSpacer size="l" />

      <EuiButton onClick={toggleDisabled}>
        {isDisabled ? 'Enable' : 'Disable'} the detector
      </EuiButton>

      <EuiSpacer size="l" />

      {showCallOut ? (
        <div>
          <EuiCallOut title="Clicking outside" color="danger" />
        </div>
      ) : null}
    </div>
  );
};
