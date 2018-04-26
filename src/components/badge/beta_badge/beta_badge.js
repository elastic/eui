import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiToolTip } from '../../tool_tip';

export const EuiBetaBadge = ({
  className,
  label,
  description,
  tooltipPosition,
  title,
  ...rest,
}) => {

  const classes = classNames(
    'euiBetaBadge',
    className
  );

  if (description) {
    return (
      <EuiToolTip
        position={tooltipPosition}
        content={description}
        title={title}
      >
        <span
          className={classes}
          {...rest}
        >
          {label}
        </span>
      </EuiToolTip>
    );
  } else {
    return (
      <span
        className={classes}
        title={title}
        {...rest}
      >
        {label}
      </span>
    )
  }
}

EuiBetaBadge.propTypes = {
  className: PropTypes.string,

  /**
   * One word label like "Beta" or "Lab"
   */
  label: PropTypes.string.isRequired,

  /**
   * Description for the tooltip
   */
  description: PropTypes.node,

  /**
   * Custom position of the tooltip
   */
  tooltipPosition: PropTypes.string,

  /**
   * Optional title will be supplied as tooltip title or title attribute
   */
  title: PropTypes.string,
}

EuiBetaBadge.defaultProps = {
  tooltipPosition: 'top',
};
