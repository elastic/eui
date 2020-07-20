import React, { useState, Fragment } from 'react';

import { EuiSwitch, EuiSpacer } from '../../../../src/components';

export default () => {
  const [checked, setChecked] = useState(false);

  const onChange = e => {
    setChecked(e.target.checked);
  };

  return (
    <Fragment>
      <EuiSwitch
        label="I am a switch"
        checked={checked}
        onChange={e => onChange(e)}
      />

      <EuiSpacer size="m" />

      <EuiSwitch
        label="I am a disabled switch"
        checked={checked}
        onChange={e => onChange(e)}
        disabled
      />

      <EuiSpacer size="m" />

      <EuiSwitch
        showLabel={false}
        label="I am a switch without a visible label"
        checked={checked}
        onChange={e => onChange(e)}
      />

      <EuiSpacer size="m" />

      <EuiSwitch
        label="I am a compressed switch"
        checked={checked}
        onChange={e => onChange(e)}
        compressed
      />

      <EuiSpacer size="m" />

      <EuiSwitch
        label="I am a compressed, disabled switch"
        checked={checked}
        onChange={e => onChange(e)}
        compressed
        disabled
      />

      <EuiSpacer size="m" />

      <EuiSwitch
        showLabel={false}
        label="I am a compressed switch without a visible label"
        checked={checked}
        onChange={e => onChange(e)}
        compressed
      />
    </Fragment>
  );
};
