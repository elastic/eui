import React, { useState, Fragment } from 'react';

import { EuiSwitch, EuiFormRow } from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const toggleTextSwitchId = useGeneratedHtmlId({ prefix: 'toggleTextSwitch' });

  const onChange1 = (e: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setChecked1(e.target.checked);
  };

  const onChange2 = (e: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setChecked2(e.target.checked);
  };

  return (
    <Fragment>
      <EuiFormRow display="columnCompressedSwitch" label="Enable">
        <EuiSwitch
          showLabel={false}
          label="Enable"
          checked={checked1}
          onChange={onChange1}
          compressed
        />
      </EuiFormRow>
      <EuiFormRow
        display="columnCompressedSwitch"
        label={<span id={toggleTextSwitchId}>Show something</span>}
      >
        <EuiSwitch
          label={checked2 ? 'on' : 'off'}
          checked={checked2}
          onChange={onChange2}
          aria-describedby={toggleTextSwitchId}
          compressed
        />
      </EuiFormRow>
    </Fragment>
  );
};
