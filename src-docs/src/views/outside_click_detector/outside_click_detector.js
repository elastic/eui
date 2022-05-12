import React, { useState } from 'react';

import {
  EuiButton,
  EuiOutsideClickDetector,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div>
      <EuiOutsideClickDetector
        onOutsideClick={() => {
          window.alert('Clicked outside');
        }}
        isDisabled={isDisabled}
      >
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
    </div>
  );
};
