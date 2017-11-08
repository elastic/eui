import React from 'react';

import {
  KibanaHeader,
} from '../partials';

export default ({
  children,
  ...rest
}) => (
  <div {...rest}>
    <KibanaHeader />
    {children}
  </div>
);
