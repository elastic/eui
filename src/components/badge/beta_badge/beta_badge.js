import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiToolTip } from '../../tool_tip';

import { IconPropType, EuiIcon } from '../../icon';

export const EuiBetaBadge = ({
  className,
  label,
  tooltipContent,
  tooltipPosition,
  title,
  iconType,
  ...rest
}) => {
  const classes = classNames(
    'euiBetaBadge',
    {
      'euiBetaBadge--iconOnly': iconType,
    },
    className
  );

  let icon;
  if (iconType) {
    icon = (
      <EuiIcon
        className="euiBetaBadge__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  if (tooltipContent) {
    return (
      <EuiToolTip
        position={tooltipPosition}
        content={tooltipContent}
        title={title || label}>
        <span className={classes} {...rest}>
          {icon || label}
        </span>
      </EuiToolTip>
    );
  } else {
    return (
      <span className={classes} title={title || label} {...rest}>
        {icon || label}
      </span>
    );
  }
};

EuiBetaBadge.propTypes = {
  className: PropTypes.string,

  /**
   * One word label like "Beta" or "Lab"
   */
  label: PropTypes.node.isRequired,

  /**
   * Supply an icon type if the badge should just be an icon
   */
  iconType: IconPropType,

  /**
   * Content for the tooltip
   */
  tooltipContent: PropTypes.node,

  /**
   * Custom position of the tooltip
   */
  tooltipPosition: PropTypes.string,

  /**
   * Optional title will be supplied as tooltip title or title attribute otherwise the label will be used
   */
  title: PropTypes.string,
};

EuiBetaBadge.defaultProps = {
  tooltipPosition: 'top',
};
