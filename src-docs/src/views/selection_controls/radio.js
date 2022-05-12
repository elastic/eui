import React, { useState, Fragment } from 'react';

import { EuiRadio, EuiSpacer } from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [checked, setChecked] = useState(false);

  const basicRadioButtonId = useGeneratedHtmlId({ prefix: 'basicRadioButton' });
  const disabledRadioButtonId = useGeneratedHtmlId({
    prefix: 'disabledRadioButton',
  });
  const compressedRadioButtonId = useGeneratedHtmlId({
    prefix: 'compressedRadioButton',
  });

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <Fragment>
      <EuiRadio
        id={basicRadioButtonId}
        label="I am a radio"
        checked={checked}
        onChange={(e) => onChange(e)}
      />

      <EuiSpacer size="m" />

      <EuiRadio
        id={disabledRadioButtonId}
        label="I am a disabled radio"
        checked={checked}
        onChange={(e) => onChange(e)}
        disabled
      />

      <EuiSpacer size="m" />

      <EuiRadio
        id={compressedRadioButtonId}
        label="I am a compressed radio"
        checked={checked}
        onChange={(e) => onChange(e)}
        compressed
      />
    </Fragment>
  );
};
