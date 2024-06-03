import React, { useState, Fragment } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiCode,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState(htmlIdGenerator()());

  const reGenerate = () => {
    setValue(htmlIdGenerator()());
  };

  return (
    <Fragment>
      <EuiFlexGroup
        justifyContent="flexStart"
        gutterSize="m"
        alignItems="center"
      >
        <EuiFlexItem grow={false}>
          <EuiCode>{value}</EuiCode>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={reGenerate}>Regenerate</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};
