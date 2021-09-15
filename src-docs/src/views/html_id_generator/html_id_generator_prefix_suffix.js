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

export default () => {
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
          <EuiFormRow label="Prefix">
            <EuiFieldText
              value={prefix}
              onChange={onPrefixChange}
              placeholder="Enter prefix"
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFormRow label="Suffix">
            <EuiFieldText
              value={suffix}
              onChange={onSuffixChange}
              placeholder="Enter suffix"
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
      <EuiCode>{customId} </EuiCode>
    </Fragment>
  );
};
