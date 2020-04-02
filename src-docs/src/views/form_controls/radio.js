import React, { useState, Fragment } from 'react';

import { EuiRadio, EuiSpacer } from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default function() {
  const [checked, setChecked] = useState(false);

  const onChange = e => {
    setChecked(e.target.checked);
  };

  return (
    <Fragment>
      <EuiRadio
        id={makeId()}
        label="I am a radio"
        checked={checked}
        onChange={e => onChange(e)}
      />

      <EuiSpacer size="m" />

      <EuiRadio
        id={makeId()}
        label="I am a disabled radio"
        checked={checked}
        onChange={e => onChange(e)}
        disabled
      />

      <EuiSpacer size="m" />

      <EuiRadio
        id={makeId()}
        label="I am a compressed radio"
        checked={checked}
        onChange={e => onChange(e)}
        compressed
      />
    </Fragment>
  );
}
