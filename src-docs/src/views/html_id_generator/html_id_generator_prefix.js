import React, { useState, Fragment } from 'react';

import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiCode,
  EuiFormRow,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export const HtmlIdGeneratorPrefix = () => {
  const [prefix, setPrefix] = useState('Id');
  const [id1, setId1] = useState(htmlIdGenerator('Id')());

  const onSearchChange = e => {
    const prefix = e.target.value;
    setPrefix(prefix);
    setId1(htmlIdGenerator(prefix)());
  };

  return (
    <Fragment>
      <EuiFlexGroup
        justifyContent="flexStart"
        gutterSize="m"
        alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiFormRow label="Prefix">
            <EuiFieldText
              value={prefix}
              onChange={onSearchChange}
              placeholder="Enter prefix"
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
      <EuiCode>{id1} </EuiCode>
    </Fragment>
  );
};
