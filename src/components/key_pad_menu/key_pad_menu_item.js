import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const renderContent = (children, label) => (
  <div className="kuiKeyPadMenuItem__inner">
    <div className="kuiKeyPadMenuItem__icon">
      {children}
    </div>

    <p className="kuiKeyPadMenuItem__label">
      {label}
    </p>
  </div>
);

const commonPropTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export const EuiKeyPadMenuItem = ({ href, label, children, className, ...rest }) => {
  const classes = classNames('kuiKeyPadMenuItem', className);

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
  const classes = classNames('kuiKeyPadMenuItem', className);

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
