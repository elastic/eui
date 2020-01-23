import React from 'react';
export const EuiIcon = ({
  type,
  className,
  'data-test-subj': dataTestSubj,
  id,
  ...rest
}: any) => (
  <div
    data-euiicon-type={type}
    id={id}
    className={className}
    data-test-subj={dataTestSubj}
    {...rest}
  />
);

export const TYPES = [];
export const COLORS = [];
export const SIZES = [];
