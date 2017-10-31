import React from 'react';

import {
  KibanaHeader,
} from '../common';

export default ({
  children,
  ...rest
}) => (
  <div {...rest}>
    <KibanaHeader />
    {children}
  </div>
);
