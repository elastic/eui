import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

export type EuiTourProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    size?: string;
  };

export const EuiTour: React.FunctionComponent<EuiTourProps> = ({
  className,
  size = 'l',
  ...rest
}) => {
  const classes = classNames('euiTour', size, className);

  return (
    <div className={classes} {...rest}>
      Test
    </div>
  );
};
