import React, { useState } from 'react';

import { EuiButton, EuiButtonIcon } from '../../../../src/components';

export default () => {
  const [toggle2On, setToggle2On] = useState(true);
  const [toggle3On, setToggle3On] = useState(false);

  return (
    <>
      <EuiButton
        isSelected={toggle2On}
        fill={toggle2On}
        iconType={toggle2On ? 'starFilledSpace' : 'starPlusEmpty'}
        onClick={() => {
          setToggle2On((isOn) => !isOn);
        }}
      >
        Toggle me
      </EuiButton>
      &emsp;
      <EuiButtonIcon
        display={toggle3On ? 'base' : 'empty'}
        size="m"
        aria-label="Autosave"
        title="Autosave"
        iconType="save"
        aria-pressed={toggle3On}
        color={toggle3On ? 'primary' : 'subdued'}
        onClick={() => {
          setToggle3On((isOn) => !isOn);
        }}
      />
    </>
  );
};
