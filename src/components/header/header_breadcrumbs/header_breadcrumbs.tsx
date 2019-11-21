import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import {
  Breadcrumb,
  EuiBreadcrumbs,
  EuiBreadcrumbsProps,
} from '../../breadcrumbs';

type Props = EuiBreadcrumbsProps & {
  breadcrumbs: Breadcrumb[];
};

export const EuiHeaderBreadcrumbs: FunctionComponent<Props> = ({
  className,
  breadcrumbs,
  ...rest
}) => {
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
