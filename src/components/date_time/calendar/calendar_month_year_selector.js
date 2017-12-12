import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from '../../../components';

export const EuiCalendarMonthYearSelector = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiCalendarMonthYearSelector', className);

  return (
    <EuiFlexGroup
      alignItems="center"
      justifyContent="spaceBetween"
      className={classes}
      {...rest}
    >
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          size="s"
          color="text"
          iconType="arrowLeft"
          aria-label="Previous month"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <div>
          <span className="euiCalendarMonth">December</span>
          <span className="euiCalendarYear"> 2017</span>
        </div>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          size="s"
          color="text"
          iconType="arrowRight"
          aria-label="Next month"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

EuiCalendarMonthYearSelector.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
