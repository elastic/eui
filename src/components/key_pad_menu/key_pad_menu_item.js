import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const renderContent = (children, label) => (
  <div className="euiKeyPadMenuItem__inner">
    <div className="euiKeyPadMenuItem__icon">
      {children}
    </div>

    <p className="euiKeyPadMenuItem__label">
      {label}
    </p>
  </div>
);

const commonPropTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
};

export const EuiKeyPadMenuItem = ({ href, label, children, className, ...rest }) => {
  const classes = classNames('euiKeyPadMenuItem', className);

  return (
    <a
      href={href}
      className={classes}
      {...rest}
    >
      {renderContent(children, label)}
    </a>
  );
};

EuiKeyPadMenuItem.propTypes = ({ ...{
  href: PropTypes.string,
}, ...commonPropTypes });

export const EuiKeyPadMenuItemButton = ({ onClick, label, children, className, ...rest }) => {
  const classes = classNames('euiKeyPadMenuItem', className);

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {renderContent(children, label)}
    </button>
  );
};

EuiKeyPadMenuItemButton.propTypes = ({ ...{
  onClick: PropTypes.func,
}, ...commonPropTypes });
