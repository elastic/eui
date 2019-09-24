import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiBetaBadge } from '../../components/badge/beta_badge';

import { IconPropType } from '../icon';

const renderContent = (
  children,
  label,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeIconType
) => (
  <div className="euiKeyPadMenuItem__inner">
    {betaBadgeLabel && (
      <span className="euiKeyPadMenuItem__betaBadgeWrapper">
        <EuiBetaBadge
          className="euiKeyPadMenuItem__betaBadge"
          label={betaBadgeLabel}
          iconType={betaBadgeIconType}
          tooltipContent={betaBadgeTooltipContent}
        />
      </span>
    )}

    <div className="euiKeyPadMenuItem__icon">{children}</div>

    <p className="euiKeyPadMenuItem__label">{label}</p>
  </div>
);

const commonPropTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,

  /**
   * Add a badge to the card to label it as "Beta" or other non-GA state
   */
  betaBadgeLabel: PropTypes.string,

  /**
   * Supply an icon type if the badge should just be an icon
   */
  betaBadgeIconType: IconPropType,

  /**
   * Add a description to the beta badge (will appear in a tooltip)
   */
  betaBadgeTooltipContent: PropTypes.node,
  isDisabled: PropTypes.bool,
};

export const EuiKeyPadMenuItem = ({
  href,
  isDisabled,
  label,
  children,
  className,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeIconType,
  ...rest
}) => {
  const classes = classNames(
    'euiKeyPadMenuItem',
    {
      'euiKeyPadMenuItem--hasBetaBadge': betaBadgeLabel,
    },
    className
  );

  if (!isDisabled) {
    return (
      <a href={href} className={classes} role="menuitem" {...rest}>
        {renderContent(
          children,
          label,
          betaBadgeLabel,
          betaBadgeTooltipContent,
          betaBadgeIconType
        )}
      </a>
    );
  }

  return (
    <button type="button" disabled={isDisabled} className={classes} {...rest}>
      {renderContent(
        children,
        label,
        betaBadgeLabel,
        betaBadgeTooltipContent,
        betaBadgeIconType
      )}
    </button>
  );
};

EuiKeyPadMenuItem.propTypes = {
  ...{
    href: PropTypes.string,
  },
  ...commonPropTypes,
};

export const EuiKeyPadMenuItemButton = ({
  onClick,
  label,
  children,
  className,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeIconType,
  isDisabled,
  ...rest
}) => {
  const classes = classNames(
    'euiKeyPadMenuItem',
    {
      'euiKeyPadMenuItem--hasBetaBadge': betaBadgeLabel,
    },
    className
  );

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={classes}
      {...rest}>
      {renderContent(
        children,
        label,
        betaBadgeLabel,
        betaBadgeTooltipContent,
        betaBadgeIconType
      )}
    </button>
  );
};

EuiKeyPadMenuItemButton.propTypes = {
  ...{
    onClick: PropTypes.func,
  },
  ...commonPropTypes,
};
