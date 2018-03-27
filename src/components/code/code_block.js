import React from 'react';

import { EuiCodeBlockImpl } from './_code_block';

export const EuiCodeBlock = ({
  inline, // eslint-disable-line
  ...rest
}) => {
  return <EuiCodeBlockImpl inline={false} {...rest} />;
};

EuiCodeBlock.propTypes = {
  ...EuiCodeBlockImpl.propTypes,
};
