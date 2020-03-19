import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  ReactNode,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../common';

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
  onClick?: () => void;
  href?: string;
}

export type EuiKeyPadMenuItemProps = CommonProps &
  ExclusiveUnion<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonHTMLAttributes<HTMLButtonElement>
  > &
  EuiKeyPadMenuItemCommonProps;

export const EuiKeyPadMenuItem: FunctionComponent<EuiKeyPadMenuItemProps> = ({
  isDisabled,
  label,
  children,
  className,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeIconType,
  href,
  ...rest
}) => {
  const classes = classNames(
    'euiKeyPadMenuItem',
    {
      'euiKeyPadMenuItem--hasBetaBadge': betaBadgeLabel,
    },
    className
  );

  const Element = href && !isDisabled ? 'a' : 'button';
  const relObj: {
    role?: string;
    disabled?: boolean;
    type?: string;
    href?: string;
  } = {};

  if (href && !isDisabled) {
    relObj.role = 'menuitem';
    relObj.href = href;
  } else {
    relObj.type = 'button';
    relObj.disabled = isDisabled;
  }

  return (
    <Element
      className={classes}
      {...relObj as HTMLAttributes<HTMLElement>}
      {...rest as HTMLAttributes<HTMLElement>}>
      {renderContent(
        children,
        label,
        betaBadgeLabel,
        betaBadgeTooltipContent,
        betaBadgeIconType
      )}
    </Element>
  );
};
