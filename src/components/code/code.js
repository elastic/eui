import React from 'react';

import {
  EuiCodeBlockImpl,
} from './_code_block';

export const EuiCode = ({ ...rest }) => {
  return (
    <EuiCodeBlockImpl
      inline={true}
      {...rest}
    />
  );
};

EuiCode.propTypes = {
  ...EuiCodeBlockImpl.propTypes
};
