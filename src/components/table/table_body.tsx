import React, { FunctionComponent, Ref } from 'react';
import { CommonProps } from '../common';

type Props = CommonProps & {
  bodyRef?: Ref<HTMLTableSectionElement>;
};

export const EuiTableBody: FunctionComponent<Props> = ({
  children,
  className,
  bodyRef,
  ...rest
}) => {
  return (
    <tbody className={className} ref={bodyRef} {...rest}>
      {children}
    </tbody>
  );
};
