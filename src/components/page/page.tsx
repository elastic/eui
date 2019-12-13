import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export interface EuiPageProps extends CommonProps {
  restrictWidth?: boolean | number | string;
  style?: React.CSSProperties;
}

export const EuiPage: FunctionComponent<EuiPageProps> = ({
  children,
  /**
   * Sets the max-width of the page,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  restrictWidth = false,
  style,
  className,
  ...rest
}) => {
  let widthClassname;
  let newStyle;

  if (restrictWidth === true) {
    widthClassname = 'euiPage--restrictWidth-default';
  } else if (restrictWidth !== false) {
    widthClassname = 'euiPage--restrictWidth-custom';
    const value =
      typeof restrictWidth === 'number' ? `${restrictWidth}px` : restrictWidth;
    newStyle = { ...style, maxWidth: value };
  }

  const classes = classNames('euiPage', widthClassname, className);

  return (
    <div className={classes} style={newStyle || style} {...rest}>
      {children}
    </div>
  );
};
