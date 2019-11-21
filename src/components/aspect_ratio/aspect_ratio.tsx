import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type EuiAspectRatioProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * Aspect ratio width. For example 9 would be widescreen video.
     */
    height: number;
    /**
     * Aspect ratio width. For example 16 would be widescreen video.
     */
    width: number;
    /**
     * The maximum width you want the child to stretch to.
     */
    maxWidth?: number;
  };

export const EuiAspectRatio: FunctionComponent<EuiAspectRatioProps> = ({
  children,
  className,
  height,
  width,
  maxWidth,
  ...rest
}) => {
  const classes = classNames('euiAspectRatio', className);

  const paddingBottom = `${(height / width) * 100}%`;

  const content = (
    <div
      className={classes}
      {...rest}
      style={{
        paddingBottom: paddingBottom,
        maxWidth: maxWidth ? maxWidth : 'auto',
      }}>
      {children}
    </div>
  );

  let contentwithoptionalwrap = content;
  if (maxWidth) {
    contentwithoptionalwrap = (
      <div style={{ maxWidth: maxWidth }}>{content}</div>
    );
  }

  return contentwithoptionalwrap;
};
