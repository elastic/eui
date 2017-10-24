import React from 'react';
import classNames from 'classnames';

export const EuiHeaderBreadcrumbCollapsed = ({ className, ...rest }) => {
  const classes = classNames('euiHeaderBreadcrumb euiHeaderBreadcrumb--collapsed', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      &#8230;
    </div>
  );
};
