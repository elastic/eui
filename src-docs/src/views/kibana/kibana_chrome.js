import React from 'react';

import KibanaHeader from '../header/header';

export default ({
  children,
  ...rest
}) => (
  <div {...rest}>
    <KibanaHeader />
    {children}
  </div>
);
