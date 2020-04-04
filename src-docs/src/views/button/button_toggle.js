import React, { useState } from 'react';

import {
  EuiButton,
  EuiButtonIcon,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

export default () => {
  const [toggle0On, setToggle0On] = useState(false);
  const [toggle1On, setToggle1On] = useState(false);
  const [toggle2On, setToggle2On] = useState(true);
  const [toggle3On, setToggle3On] = useState(true);

  return (
    <>
      <EuiButton
        fill={toggle0On}
        aria-pressed={toggle0On}
        iconType={toggle0On ? 'starPlusEmpty' : 'starFilledSpace'}
        onClick={() => {
          setToggle0On(!toggle0On);
        }}>
        Toggle Me
      </EuiButton>
      &emsp;
      <EuiButton
        fill={toggle1On}
        onClick={() => {
          setToggle1On(!toggle1On);
        }}>
        {toggle1On ? 'I am a primary toggle' : 'I am a filled toggle'}
      </EuiButton>
      &emsp;
      <EuiButtonIcon
        aria-label={toggle2On ? 'Play' : 'Pause'}
        iconType={toggle2On ? 'play' : 'pause'}
        onClick={() => {
          setToggle2On(!toggle2On);
        }}
      />
      &emsp;
      <EuiButtonIcon
        aria-label="Autosave"
        iconType="save"
        aria-pressed={toggle3On}
        onClick={() => {
          setToggle3On(!toggle3On);
        }}
      />
      <EuiSpacer size="m" />
      <EuiTitle size="xxs">
        <h3>Disabled</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButton isDisabled={true} fill={false}>
        Can&apos;t toggle this
      </EuiButton>
      &emsp;
      <EuiButton isDisabled={true} fill={true}>
        Can&apos;t toggle this either
      </EuiButton>
    </>
  );
};
