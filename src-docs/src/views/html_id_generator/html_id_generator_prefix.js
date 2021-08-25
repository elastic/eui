import React, { useState, Fragment } from 'react';

import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiCode,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export const HtmlIdGeneratorPrefix = () => {
  const [prefix, setPrefix] = useState('Id');
  const [customId, setCustomId] = useState(htmlIdGenerator('Id')());

  const onSearchChange = (e) => {
    const prefix = e.target.value;
    setPrefix(prefix);
    setCustomId(htmlIdGenerator(prefix)());
  };

  return (
    <Fragment>
      <EuiFlexGroup
        justifyContent="flexStart"
        gutterSize="m"
        alignItems="center"
      >
        <EuiFlexItem grow={false}>
          <EuiFieldText
            label="Prefix"
            value={prefix}
            onChange={onSearchChange}
            placeholder="Enter prefix"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
      <EuiCode>{customId} </EuiCode>
    </Fragment>
  );
};
