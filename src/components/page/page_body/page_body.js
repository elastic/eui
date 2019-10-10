import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPageBody = ({
  children,
  restrictWidth,
  style,
  className,
  component,
  ...rest
}) => {
  let widthClassname;
  let newStyle;

  if (restrictWidth === true) {
    widthClassname = 'euiPageBody--restrictWidth-default';
  } else if (restrictWidth !== false) {
    widthClassname = 'euiPageBody--restrictWidth-custom';
    const value =
      typeof maxWidth === 'number' ? `${restrictWidth}px` : restrictWidth;
    newStyle = { ...style, maxWidth: value };
  }

  const classes = classNames('euiPageBody', widthClassname, className);

  const OuterElement = component;

  return (
    <OuterElement className={classes} style={newStyle || style} {...rest}>
      {children}
    </OuterElement>
  );
};

EuiPageBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Sets the HTML element for `EuiPageBody`.
   */
  component: PropTypes.string,
  /**
   * Sets the max-width of the page,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  restrictWidth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

EuiPageBody.defaultProps = {
  restrictWidth: false,
  component: 'main',
};
