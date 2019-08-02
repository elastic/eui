import React, { FunctionComponent } from 'react';
import { CommonProps } from '../common';

export const EuiTableFooter: FunctionComponent<CommonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <tfoot className={className} {...rest}>
      <tr>{children}</tr>
    </tfoot>
  );
};
