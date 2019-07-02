/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiFilterButton } from '../filter_group';
import { EuiFieldText } from '../form';
import { EuiToolTip } from '../tool_tip';
import { EuiIcon } from '../icon';

export const EuiSuggestInput = ({ className, status, value, ...rest }) => {

  const filterTriggerButton = (
    <EuiFilterButton title="title">Filters</EuiFilterButton>
  );

  const statusElement = (
    <EuiToolTip position="left" content={status.tooltip}>
      <div className="status">
        <EuiIcon color={status.color} type={status.icon} />
        <span className="statusLabel">{status.label}</span>
      </div>
    </EuiToolTip>
  );

  const classes = classNames('euiSuggestInput', className);

  return (
    <div className={classes} {...rest}>
      <EuiFieldText
        value={value}
        fullWidth
        prepend={filterTriggerButton}
        append={statusElement}
      />
    </div>
  );
};

EuiSuggestInput.propTypes = {
  className: PropTypes.string,
  /**
   * Takes 'icon' for EuiIcon, 'color'. 'color' can be either our palette colors (primary, secondary, etc) or a hex value.
   */
  status: PropTypes.object,
};

EuiSuggestInput.defaultProps = {};
