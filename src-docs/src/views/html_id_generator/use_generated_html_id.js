import React, { useState, Fragment } from 'react';

import { EuiSwitch, EuiSpacer, EuiCode } from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const generatedId = useGeneratedHtmlId({ prefix: 'Some', suffix: 'id' });

  const [isChecked, setIsChecked] = useState(false);
  const onChange = (e) => setIsChecked(e.target.checked);

  return (
    <Fragment>
      <EuiSwitch
        label="Clicking me changes component state"
        checked={isChecked}
        onChange={onChange}
      />
      <EuiSpacer size="xl" />
      <EuiCode>{generatedId} </EuiCode>
    </Fragment>
  );
};
