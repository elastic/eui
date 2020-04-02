import React, { useState, Fragment } from 'react';

import { EuiCheckbox, EuiSpacer } from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default function() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setindeterminate] = useState(true);

  const onChange = e => {
    setChecked(e.target.checked);
  };

  const onChangeIndeterminate = () => {
    setindeterminate(!indeterminate);
  };

  return (
    <Fragment>
      <EuiCheckbox
        id={makeId()}
        label="I am a checkbox"
        checked={checked}
        onChange={e => onChange(e)}
      />

      <EuiSpacer size="m" />

      <EuiCheckbox
        id={makeId()}
        label="I am an indeterminate checkbox"
        indeterminate={indeterminate}
        onChange={() => onChangeIndeterminate()}
      />

      <EuiSpacer size="m" />

      <EuiCheckbox
        id={makeId()}
        label="I am a disabled checkbox"
        checked={checked}
        onChange={e => onChange(e)}
        disabled
      />

      <EuiSpacer size="m" />

      <EuiCheckbox
        id={makeId()}
        label="I am a compressed checkbox"
        checked={checked}
        onChange={e => onChange(e)}
        compressed
      />
    </Fragment>
  );
}
