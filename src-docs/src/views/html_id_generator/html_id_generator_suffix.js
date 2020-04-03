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

export const HtmlIdGeneratorSuffix = () => {
  const [suffix, setSuffix] = useState('Id');
  const [id1, setId1] = useState(htmlIdGenerator()('Id'));

  const onSuffixChange = e => {
    const suffix = e.target.value;
    setSuffix(suffix);
    setId1(htmlIdGenerator()(suffix));
  };

  return (
    <Fragment>
      <EuiFlexGroup
        justifyContent="flexStart"
        gutterSize="m"
        alignItems="center">
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
      <EuiCode>{id1} </EuiCode>
    </Fragment>
  );
};
