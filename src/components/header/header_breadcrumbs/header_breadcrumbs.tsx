import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { Breadcrumb, EuiBreadcrumbs } from '../../breadcrumbs';

type Props = CommonProps & {
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
