import React, { useState, Fragment } from 'react';

import { EuiRadio, EuiSpacer } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [checked, setChecked] = useState(false);

  const radioID__1 = htmlIdGenerator('radio')();
  const radioID__2 = htmlIdGenerator('radio')();
  const radioID__3 = htmlIdGenerator('radio')();

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <Fragment>
      <EuiRadio
        id={radioID__1}
        label="I am a radio"
        checked={checked}
        onChange={(e) => onChange(e)}
      />

      <EuiSpacer size="m" />

      <EuiRadio
        id={radioID__2}
        label="I am a disabled radio"
        checked={checked}
        onChange={(e) => onChange(e)}
        disabled
      />

      <EuiSpacer size="m" />

      <EuiRadio
        id={radioID__3}
        label="I am a compressed radio"
        checked={checked}
        onChange={(e) => onChange(e)}
        compressed
      />
    </Fragment>
  );
};
