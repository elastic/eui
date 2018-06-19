import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPage = ({ children, className, restrictWidth, style, ...rest }) => {
  let widthClassname;

  if (restrictWidth === true) {
    widthClassname = 'euiPage--restrictWidth-default';
  } else if (restrictWidth === false) {
    widthClassname = 'euiPage--widthIsNotRestricted';
  } else {
    widthClassname = 'euiPage--restrictWidth-custom';

    // if style has been passed as a prop, add to it
    if (style) {
      style.maxWidth = `${restrictWidth}px`;
    }
    // otherwise create a new object
    else {
      style = { maxWidth: `${restrictWidth}px` };
    }
  }

  const classes = classNames(
    'euiPage',
    widthClassname,
    className,
  );

  return (
    <div
      className={classes}
      style={style}
      {...rest}
    >
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
   * set to a number for a custom width.
   */
  restrictWidth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
};

EuiPage.defaultProps = {
  restrictWidth: false,
};
