import React, { useState, Fragment } from 'react';

import { EuiCheckbox, EuiSpacer } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setindeterminate] = useState(true);

  const checkboxID__1 = htmlIdGenerator('checkbox')();
  const checkboxID__2 = htmlIdGenerator('checkbox')();
  const checkboxID__3 = htmlIdGenerator('checkbox')();
  const checkboxID__4 = htmlIdGenerator('checkbox')();

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  const onChangeIndeterminate = () => {
    setindeterminate(!indeterminate);
  };

  return (
    <Fragment>
      <EuiCheckbox
        id={checkboxID__1}
        label="I am a checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
      />

      <EuiSpacer size="m" />

      <EuiCheckbox
        id={checkboxID__2}
        label="I am an indeterminate checkbox"
        indeterminate={indeterminate}
        onChange={() => onChangeIndeterminate()}
      />

      <EuiSpacer size="m" />

      <EuiCheckbox
        id={checkboxID__3}
        label="I am a disabled checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
        disabled
      />

      <EuiSpacer size="m" />

      <EuiCheckbox
        id={checkboxID__4}
        label="I am a compressed checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
        compressed
      />
    </Fragment>
  );
};
