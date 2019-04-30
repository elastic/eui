import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiBetaBadge } from '../badge/beta_badge';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPanel--paddingSmall',
  m: 'euiPanel--paddingMedium',
  l: 'euiPanel--paddingLarge',
};

export const SIZES = Object.keys(paddingSizeToClassNameMap);

export const EuiPanel = ({
  children,
  className,
  paddingSize,
  hasShadow,
  grow,
  panelRef,
  onClick,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeTitle,
  ...rest
}) => {
  const classes = classNames(
    'euiPanel',
    paddingSizeToClassNameMap[paddingSize],
    {
      'euiPanel--shadow': hasShadow,
      'euiPanel--flexGrowZero': !grow,
      'euiPanel--isClickable': onClick,
      'euiPanel--hasBetaBadge': betaBadgeLabel,
    },
    className
  );

  const PanelTag = onClick ? 'button' : 'div';

  const props = {
    ref: panelRef,
    className: classes,
  };

  // Avoid passing down this prop if it hasn't been supplied, in order to
  // avoid noise in react-test-renderer snapshots.
  if (onClick != null) {
    props.onClick = onClick;
  }

  let optionalBetaBadge;
  if (betaBadgeLabel) {
    optionalBetaBadge = (
      <span className="euiPanel__betaBadgeWrapper">
        <EuiBetaBadge
          label={betaBadgeLabel}
          title={betaBadgeTitle}
          tooltipContent={betaBadgeTooltipContent}
          className="euiPanel__betaBadge"
        />
      </span>
    );
  }

  return (
    <PanelTag {...props} {...rest}>
      {optionalBetaBadge}
      {children}
    </PanelTag>
  );
};

EuiPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * If active, adds a deeper shadow to the panel
   */
  hasShadow: PropTypes.bool,
  /**
   * Padding applied to the panel
   */
  paddingSize: PropTypes.oneOf(SIZES),
  /**
   * When true the panel will grow to match `EuiFlexItem`
   */
  grow: PropTypes.bool,
  panelRef: PropTypes.func,
  onClick: PropTypes.func,
  /**
   * Add a badge to the panel to label it as "Beta" or other non-GA state
   */
  betaBadgeLabel: PropTypes.string,

  /**
   * Add a description to the beta badge (will appear in a tooltip)
   */
  betaBadgeTooltipContent: PropTypes.node,

  /**
   * Optional title will be supplied as tooltip title or title attribute otherwise the label will be used
   */
  betaBadgeTitle: PropTypes.string,
};

EuiPanel.defaultProps = {
  paddingSize: 'm',
  hasShadow: false,
  grow: true,
};
