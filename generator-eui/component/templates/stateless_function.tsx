import React, { HTMLAttributes, SFC } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type <%= componentName %>Props = HTMLAttributes<HTMLDivElement> & CommonProps & {

};

export const <%= componentName %>: React.SFC<<%= componentName %>Props> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('<%= cssClassName %>', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
