import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type EuiBeaconProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  CommonProps & {
    /**
     * Height and width
     */
    size?: number;
  };

export const EuiBeacon: FunctionComponent<EuiBeaconProps> = ({
  className,
  size = 12,
  style,
  ...rest
}) => {
  const classes = classNames('euiBeacon', className);

  const styles = {
    ...style,
    height: size,
    width: size,
  };

  return <div className={classes} style={styles} {...rest} />;
};
