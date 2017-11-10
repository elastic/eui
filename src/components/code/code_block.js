import React from 'react';

import {
  EuiCodeBlockImpl,
} from './_code_block';

export const EuiCodeBlock = ({ ...rest }) => {
  return (
    <EuiCodeBlockImpl
      inline={false}
      {...rest}
    />
  );
};

EuiCodeBlock.propTypes = {
  ...EuiCodeBlockImpl.propTypes
};
