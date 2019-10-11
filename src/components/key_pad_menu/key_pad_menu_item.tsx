import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { EuiBetaBadge } from '../badge/beta_badge';

import { IconType } from '../icon';

const renderContent = (
  children: ReactNode,
  label: ReactNode,
  betaBadgeLabel?: ReactNode,
  betaBadgeTooltipContent?: ReactNode,
  betaBadgeIconType?: IconType
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

interface EuiKeyPadMenuItemCommonProps {
  children: ReactNode;
  isDisabled?: boolean;
  label: ReactNode;

  /**
   * Add a badge to the card to label it as "Beta" or other non-GA state
   */
  betaBadgeLabel?: string;

  /**
   * Supply an icon type if the badge should just be an icon
   */
  betaBadgeIconType?: IconType;

  /**
   * Add a description to the beta badge (will appear in a tooltip)
   */
  betaBadgeTooltipContent?: ReactNode;
}

export type EuiKeyPadMenuItemProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  EuiKeyPadMenuItemCommonProps;

export const EuiKeyPadMenuItem: FunctionComponent<EuiKeyPadMenuItemProps> = ({
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
    <button
      type="button"
      disabled={isDisabled}
      className={classes}
      // Type case needed due to how the props are defined
      {...rest as ButtonHTMLAttributes<HTMLButtonElement>}>
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

export type EuiKeyPadMenuItemButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  EuiKeyPadMenuItemCommonProps;

export const EuiKeyPadMenuItemButton: FunctionComponent<
  EuiKeyPadMenuItemButtonProps
> = ({
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
