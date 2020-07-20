import React, { useState } from 'react';

import {
  EuiButtonToggle,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

export default () => {
  const [toggle0On, setToggle0On] = useState(false);
  const [toggle1On, setToggle1On] = useState(false);
  const toggle2On = false;
  const toggle3On = true;
  const [toggle4On, setToggle4On] = useState(true);

  const onToggle0Change = e => {
    setToggle0On(e.target.checked);
  };

  const onToggle1Change = e => {
    setToggle1On(e.target.checked);
  };

  const onToggle4Change = e => {
    setToggle4On(e.target.checked);
  };

  return (
    <div>
      <EuiButtonToggle
        label="Toggle Me"
        iconType={toggle0On ? 'starPlusEmpty' : 'starFilledSpace'}
        onChange={onToggle0Change}
        isSelected={toggle0On}
      />
      &emsp;
      <EuiButtonToggle
        label={toggle1On ? "I'm a filled toggle" : "I'm a primary toggle"}
        fill={toggle1On}
        onChange={onToggle1Change}
        isSelected={toggle1On}
      />
      &emsp;
      <EuiButtonToggle
        label="Toggle Me"
        iconType={toggle4On ? 'eye' : 'eyeClosed'}
        onChange={onToggle4Change}
        isSelected={toggle4On}
        isEmpty
        isIconOnly
      />
      <EuiSpacer size="m" />
      <EuiTitle size="xxs">
        <h3>Disabled</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButtonToggle
        isDisabled
        label="Can't toggle this"
        fill={toggle2On}
        isSelected={toggle2On}
      />
      &emsp;
      <EuiButtonToggle
        isDisabled
        label="Can't toggle this either"
        fill={toggle3On}
        isSelected={toggle3On}
      />
    </div>
  );
};
