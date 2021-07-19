import React, { useState } from 'react';

import { EuiButton, EuiButtonIcon } from '../../../../src/components';

export default () => {
  const [toggle0On, setToggle0On] = useState(false);
  const [toggle1On, setToggle1On] = useState(true);

  return (
    <>
      <EuiButton
        onClick={() => {
          setToggle0On((isOn) => !isOn);
        }}>
        {toggle0On ? 'Hey there good lookin' : 'Toggle me'}
      </EuiButton>
      &emsp;
      <EuiButtonIcon
        title={toggle1On ? 'Play' : 'Pause'}
        aria-label={toggle1On ? 'Play' : 'Pause'}
        iconType={toggle1On ? 'play' : 'pause'}
        onClick={() => {
          setToggle1On((isOn) => !isOn);
        }}
      />
    </>
  );
};
