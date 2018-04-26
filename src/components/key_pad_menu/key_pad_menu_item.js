import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiBetaBadge } from '../../components/badge/beta_badge';

const renderContent = (children, label, betaLabel, betaDescription) => (
  <div className="euiKeyPadMenuItem__inner">
    {betaLabel &&
      <span className="euiKeyPadMenuItem__betaBadgeWrapper">
        <EuiBetaBadge label={betaLabel} title={betaLabel} description={betaDescription} className="euiKeyPadMenuItem__betaBadge" />
      </span>
    }

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

  /**
   * Add a badge to the card to label it as "Beta" or other non-GA state
   */
  betaLabel: PropTypes.string,

  /**
   * Add a description to the beta label (will appear in a tooltip)
   */
  betaDescription: PropTypes.node,
};

export const EuiKeyPadMenuItem = ({ href, label, children, className, betaLabel, betaDescription, ...rest }) => {
  const classes = classNames(
    'euiKeyPadMenuItem',
    {
      'euiKeyPadMenuItem--hasBetaBadge': betaLabel,
    },
    className
  );

  return (
    <a
      href={href}
      className={classes}
      {...rest}
    >
      {renderContent(children, label, betaLabel, betaDescription)}
    </a>
  );
};

EuiKeyPadMenuItem.propTypes = ({ ...{
  href: PropTypes.string,
}, ...commonPropTypes });

export const EuiKeyPadMenuItemButton = ({ onClick, label, children, className, betaLabel, betaDescription, ...rest }) => {
  const classes = classNames(
    'euiKeyPadMenuItem',
    {
      'euiKeyPadMenuItem--hasBetaBadge': betaLabel,
    },
    className
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {renderContent(children, label, betaLabel, betaDescription)}
    </button>
  );
};

EuiKeyPadMenuItemButton.propTypes = ({ ...{
  onClick: PropTypes.func,
}, ...commonPropTypes });
