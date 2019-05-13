import React from 'react';
import classNames from 'classnames';

import { EuiBreadcrumbs } from '../../breadcrumbs';

export const EuiHeaderBreadcrumbs = ({ className, breadcrumbs, ...rest }) => {
  const classes = classNames('euiHeaderBreadcrumbs', className);

  return (
    <EuiBreadcrumbs
      max={4}
      truncate
      breadcrumbs={breadcrumbs}
      className={classes}
      {...rest}
    />
  );
};
