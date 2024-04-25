import React, { useState, Fragment } from 'react';

import { EuiCheckbox, EuiSpacer } from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setindeterminate] = useState(true);

  const basicCheckboxId = useGeneratedHtmlId({ prefix: 'basicCheckbox' });
  const indeterminateCheckboxId = useGeneratedHtmlId({
    prefix: 'indeterminateCheckbox',
  });
  const disabledCheckboxId = useGeneratedHtmlId({ prefix: 'disabledCheckbox' });
  const compressedCheckboxId = useGeneratedHtmlId({
    prefix: 'compressedCheckbox',
  });

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  const onChangeIndeterminate = () => {
    setindeterminate(!indeterminate);
  };

  return (
    <Fragment>
      <EuiCheckbox
        id={basicCheckboxId}
        label="I am a checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
      />

      <EuiSpacer size="m" />

      <EuiCheckbox
        id={indeterminateCheckboxId}
        label="I am an indeterminate checkbox"
        indeterminate={indeterminate}
        onChange={() => onChangeIndeterminate()}
      />

      <EuiSpacer size="m" />

      <EuiCheckbox
        id={disabledCheckboxId}
        label="I am a disabled checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
        disabled
      />

      <EuiSpacer size="m" />

      <EuiCheckbox
        id={compressedCheckboxId}
        label="I am a compressed checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
        compressed
      />
    </Fragment>
  );
};
