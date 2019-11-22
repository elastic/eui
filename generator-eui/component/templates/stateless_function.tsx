import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type <%= componentName %>Props = HTMLAttributes<HTMLDivElement> & CommonProps & {

};

export const <%= componentName %>: FunctionComponent<<%= componentName %>Props> = ({
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
