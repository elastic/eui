import React from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

type ComponentType = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export type EuiPageBodyProps<T extends ComponentType = 'main'> = CommonProps &
  React.ComponentProps<T> & {
    /**
     * Sets the max-width of the page,
     * set to `true` to use the default size,
     * set to `false` to not restrict the width,
     * set to a number for a custom width in px,
     * set to a string for a custom width in custom measurement.
     */
    restrictWidth?: boolean | number | string;
    /**
     * Sets the HTML element for `EuiPageBody`.
     */
    component?: T;
  };

export const EuiPageBody = <T extends ComponentType>({
  children,
  restrictWidth = false,
  style,
  className,
  component: Component = 'main' as T,
  ...rest
}: React.PropsWithChildren<EuiPageBodyProps<T>>) => {
  let widthClassname;
  let newStyle;

  if (restrictWidth === true) {
    widthClassname = 'euiPageBody--restrictWidth-default';
  } else if (restrictWidth !== false) {
    widthClassname = 'euiPageBody--restrictWidth-custom';
    const value =
      typeof restrictWidth === 'number' ? `${restrictWidth}px` : restrictWidth;
    newStyle = { ...style, maxWidth: value };
  }

  const classes = classNames('euiPageBody', widthClassname, className);

  return (
    <Component className={classes} style={newStyle || style} {...rest}>
      {children}
    </Component>
  );
};
