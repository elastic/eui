import React from 'react';

import {
  EuiCodeBlockImpl,
} from './_code_block';

export function EuiCodeBlock({ ...rest }) {
  return (
    <EuiCodeBlockImpl
      inline={false}
      {...rest}
    />
  );
}
