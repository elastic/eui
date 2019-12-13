import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiPageBodyProps extends CommonProps {
  /**
   * Sets the max-width of the page,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  restrictWidth?: boolean | number | string;
  style?: React.CSSProperties;
  /**
   * Sets the HTML element for `EuiPageBody`.
   */
  component?: keyof JSX.IntrinsicElements;
}

export const EuiPageBody: FunctionComponent<EuiPageBodyProps> = ({
  children,
  restrictWidth = false,
  style,
  className,
  component: Component = 'main',
  ...rest
}) => {
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
