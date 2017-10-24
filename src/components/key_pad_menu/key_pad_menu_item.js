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
  label: PropTypes.string.isRequired,
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

EuiKeyPadMenuItem.propTypes = Object.assign({
  href: PropTypes.string,
}, commonPropTypes);

export const EuiKeyPadMenuItemButton = ({ onClick, label, children, className, ...rest }) => {
  const classes = classNames('euiKeyPadMenuItem', className);

  return (
    <button
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {renderContent(children, label)}
    </button>
  );
};

EuiKeyPadMenuItemButton.propTypes = Object.assign({
  onClick: PropTypes.func,
}, commonPropTypes);
