import React, { useState } from 'react';

import {
  EuiButton,
  EuiButtonIcon,
  EuiButtonToggle,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

export default () => {
  const [toggle0On, setToggle0On] = useState(false);
  const [toggle1On, setToggle1On] = useState(true);
  const [toggle2On, setToggle2On] = useState(true);
  const [toggle3On, setToggle3On] = useState(false);

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Changing content</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButton
        onClick={() => {
          setToggle0On(!toggle0On);
        }}>
        {toggle0On ? 'Hey there good lookin' : 'Toggle me'}
      </EuiButton>
      &emsp;
      <EuiButtonIcon
        title={toggle1On ? 'Play' : 'Pause'}
        aria-label={toggle1On ? 'Play' : 'Pause'}
        iconType={toggle1On ? 'play' : 'pause'}
        onClick={() => {
          setToggle1On(!toggle1On);
        }}
      />
      <EuiSpacer size="m" />
      <EuiTitle size="xxs">
        <h3>Changing visual appearance</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButtonToggle
        isSelected={toggle2On}
        iconType={toggle2On ? 'starPlusEmpty' : 'starFilledSpace'}
        onClick={() => {
          setToggle2On(!toggle2On);
        }}>
        Toggle me
      </EuiButtonToggle>
      &emsp;
      <EuiButtonIcon
        aria-label="Autosave"
        title="Autosave"
        iconType="save"
        aria-pressed={toggle3On}
        color={toggle3On ? 'primary' : 'subdued'}
        onClick={() => {
          setToggle3On(!toggle3On);
        }}
      />
    </>
  );
};
