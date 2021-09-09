import React from 'react';

import { EuiCode } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const generateId = htmlIdGenerator('test');

export const HtmlIdGeneratorReuse = () => {
  return (
    <>
      <EuiCode>{generateId()}</EuiCode>
      <br />
      <EuiCode>{generateId()}</EuiCode>
      <br />
      <EuiCode>{generateId()}</EuiCode>
      <br />
      <EuiCode>{generateId('hello')}</EuiCode>
      <br />
      <EuiCode>{generateId('world')}</EuiCode>
    </>
  );
};
