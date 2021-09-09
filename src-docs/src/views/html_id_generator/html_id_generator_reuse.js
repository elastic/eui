import React from 'react';

import { EuiFlexGroup, EuiCode } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const generateId = htmlIdGenerator('test');

export const HtmlIdGeneratorReuse = () => {
  return (
    <EuiFlexGroup gutterSize="none" alignItems="flexStart" direction="column">
      <EuiCode>{generateId()}</EuiCode>
      <EuiCode>{generateId()}</EuiCode>
      <EuiCode>{generateId()}</EuiCode>
      <EuiCode>{generateId('hello')}</EuiCode>
      <EuiCode>{generateId('world')}</EuiCode>
    </EuiFlexGroup>
  );
};
