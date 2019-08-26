import React, { FunctionComponent } from 'react';
import { CommonProps } from '../common';

export const EuiTableHeader: FunctionComponent<CommonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <thead className={className} {...rest}>
      <tr>{children}</tr>
    </thead>
  );
};
