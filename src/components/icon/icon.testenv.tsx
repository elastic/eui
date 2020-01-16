import React from 'react';
export const EuiIcon = ({
  type,
  className,
  dataTestSubj,
  id,
}: {
  type: string;
  className?: string;
  dataTestSubj?: string;
  id?: string;
}) => (
  <div
    data-euiicon-type={type}
    id={id}
    className={className}
    data-test-subj={dataTestSubj}
  />
);
