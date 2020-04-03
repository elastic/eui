import React, { useState, Fragment } from 'react';

import { EuiRadio, EuiSpacer } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [checked, setChecked] = useState(false);

  const onChange = e => {
    setChecked(e.target.checked);
  };

  return (
    <Fragment>
      <EuiRadio
        id={htmlIdGenerator()()}
        label="I am a radio"
        checked={checked}
        onChange={e => onChange(e)}
      />

      <EuiSpacer size="m" />

      <EuiRadio
        id={htmlIdGenerator()()}
        label="I am a disabled radio"
        checked={checked}
        onChange={e => onChange(e)}
        disabled
      />

      <EuiSpacer size="m" />

      <EuiRadio
        id={htmlIdGenerator()()}
        label="I am a compressed radio"
        checked={checked}
        onChange={e => onChange(e)}
        compressed
      />
    </Fragment>
  );
};
