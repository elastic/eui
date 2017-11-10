import React from 'react';

import {
  EuiCodeBlockImpl,
} from './_code_block';

export function EuiCode({ ...rest }) {
  return (
    <EuiCodeBlockImpl
      inline={true}
      {...rest}
    />
  );
}
