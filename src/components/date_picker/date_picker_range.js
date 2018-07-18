import React, {
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiText } from '../text';
import {
  ICON_TYPES,
  EuiIcon,
} from '../icon';

export const EuiDatePickerRange = ({
  className,
  startDateControl,
  endDateControl,
  iconType,
  ...rest
}) => {

  const classes = classNames(
    'euiDatePickerRange',
    className
  );

  // Set the icon for the entire group instead of per control
  let optionalIcon;
  if (iconType) {
    const icon = typeof iconType === 'string' ? iconType : 'calendar';
    optionalIcon = (
      <span className="euiDatePickerRange__icon"><EuiIcon type={icon} /></span>
    );
  } else {
    optionalIcon = null;
  }

  const clonedStartDate = cloneElement(startDateControl, {
    showIcon: false,
  });

  const clonedEndDate = cloneElement(endDateControl, {
    showIcon: false,
  });

  return (
    <div
      className={classes}
      {...rest}
    >
      {optionalIcon}
      {clonedStartDate}
      <EuiText className="euiDatePickerRange__delimeter" size="s" color="subdued">→</EuiText>
      {clonedEndDate}
    </div>
  );
};

EuiDatePickerRange.propTypes = {
  /**
   * The start date `EuiDatePicker` element
   */
  startDateControl: PropTypes.node.isRequired,
  /**
   * The end date `EuiDatePicker` element
   */
  endDateControl: PropTypes.node.isRequired,
  /**
   * Pass either an icon type or set to `false` to remove icon entirely
   */
  iconType: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(ICON_TYPES),
  ]),
};

EuiDatePickerRange.defaultProps = {
  iconType: true,
};
