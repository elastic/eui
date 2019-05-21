import React, { cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiText } from '../text';
import { IconPropType, EuiIcon } from '../icon';

export const EuiDatePickerRange = ({
  children,
  className,
  startDateControl,
  endDateControl,
  iconType,
  fullWidth,
  isCustom,
  readOnly,
  ...rest
}) => {
  const classes = classNames(
    'euiDatePickerRange',
    {
      'euiDatePickerRange--fullWidth': fullWidth,
      'euiDatePickerRange--readOnly': readOnly,
    },
    className
  );

  // Set the icon for the entire group instead of per control
  let optionalIcon;
  if (iconType) {
    const icon = typeof iconType === 'string' ? iconType : 'calendar';
    optionalIcon = (
      <span className="euiDatePickerRange__icon">
        <EuiIcon type={icon} />
      </span>
    );
  } else {
    optionalIcon = null;
  }

  let startControl = startDateControl;
  let endControl = endDateControl;

  if (!isCustom) {
    startControl = cloneElement(startDateControl, {
      showIcon: false,
      fullWidth: fullWidth,
      readOnly: readOnly,
    });

    endControl = cloneElement(endDateControl, {
      showIcon: false,
      fullWidth: fullWidth,
      readOnly: readOnly,
    });
  }

  return (
    <div className={classes} {...rest}>
      {children ? (
        children
      ) : (
        <Fragment>
          {optionalIcon}
          {startControl}
          <EuiText
            className="euiDatePickerRange__delimeter"
            size="s"
            color="subdued">
            →
          </EuiText>
          {endControl}
        </Fragment>
      )}
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
  iconType: PropTypes.oneOfType([PropTypes.bool, IconPropType]),
  fullWidth: PropTypes.bool,
  /**
   * Won't apply any additional props to start and end date components
   */
  isCustom: PropTypes.bool,
  /**
   * Including any children will replace all innerds with the provided children
   */
  children: PropTypes.node,
};

EuiDatePickerRange.defaultProps = {
  iconType: true,
};
