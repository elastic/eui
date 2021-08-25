import React, { useState, Fragment } from 'react';

import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiCode,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export const PrefixSufix = () => {
  const [prefix, setPrefix] = useState('Some');
  const [suffix, setSuffix] = useState('Id');
  const [customId, setCustomId] = useState(htmlIdGenerator('Some')('Id'));

  const onPrefixChange = (e) => {
    const prefix = e.target.value;
    setPrefix(prefix);
    setCustomId(htmlIdGenerator(prefix)(suffix));
  };

  const onSuffixChange = (e) => {
    const suffix = e.target.value;
    setSuffix(suffix);
    setCustomId(htmlIdGenerator(prefix)(suffix));
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
            onChange={onPrefixChange}
            placeholder="Enter prefix"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFieldText
            label="Suffix"
            value={suffix}
            onChange={onSuffixChange}
            placeholder="Enter suffix"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
      <EuiCode>{customId} </EuiCode>
    </Fragment>
  );
};
