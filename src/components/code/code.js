import React from 'react';

import { EuiCodeBlockImpl } from './_code_block';

export const EuiCode = ({
  inline, // eslint-disable-line
  ...rest
}) => {
  return <EuiCodeBlockImpl inline={true} {...rest} />;
};

EuiCode.propTypes = {
  ...EuiCodeBlockImpl.propTypes,
};
