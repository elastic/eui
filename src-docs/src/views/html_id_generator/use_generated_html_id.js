import React, { useState, Fragment } from 'react';

import {
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiCode,
  EuiFormRow,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export const UseGeneratedHtmlId = () => {
  const generatedId = useGeneratedHtmlId({ prefix: 'Some', suffix: 'id' });

  const [isChecked, setIsChecked] = useState(false);
  const onChange = (e) => setIsChecked(e.target.checked);

  return (
    <Fragment>
      <EuiFlexGroup
        justifyContent="flexStart"
        gutterSize="m"
        alignItems="center"
      >
        <EuiFlexItem grow={false}>
          <EuiFormRow>
            <EuiSwitch
              label="Clicking me changes component state"
              checked={isChecked}
              onChange={onChange}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
      <EuiCode>{generatedId} </EuiCode>
    </Fragment>
  );
};
