import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPage = ({
  children,
  className,
  restrictWidth,
  style,
  ...rest
}) => {
  let widthClassname;
  let newStyle;

  if (restrictWidth === true) {
    widthClassname = 'euiPage--restrictWidth-default';
  } else if (restrictWidth !== false) {
    widthClassname = 'euiPage--restrictWidth-custom';
    const value =
      typeof maxWidth === 'number' ? `${restrictWidth}px` : restrictWidth;
    newStyle = { ...style, maxWidth: value };
  }

  const classes = classNames('euiPage', widthClassname, className);

  return (
    <div className={classes} style={newStyle || style} {...rest}>
      {children}
    </div>
  );
};

EuiPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

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

EuiPage.defaultProps = {
  restrictWidth: false,
};
