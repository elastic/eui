/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiFilterButton } from '../filter_group';
import { EuiFieldText } from '../form';
import { EuiToolTip } from '../tool_tip';
import { EuiIcon } from '../icon';
import { EuiPopover } from '../popover';

export const EuiSuggestInput = ({
  className,
  status,
  label,
  action,
  value,
  ...rest
}) => {
  const filterTriggerButton = (
    <EuiFilterButton title="title" onClick={this.toggleFilter}>
      {action}
    </EuiFilterButton>
  );

  const statusMap = {
    notYetSaved: {
      icon: 'dot',
      color: '#DD0A73',
      tooltip: "You've made changes to this saved query. Click to save them.",
    },
    saved: {
      icon: 'checkInCircleFilled',
      color: 'secondary',
    },
    noNewChanges: {
      icon: '',
      color: 'secondary',
    },
  };

  let icon;
  let color;
  let tooltip;

  if (statusMap[status]) {
    icon = statusMap[status].icon;
    color = statusMap[status].color;
    tooltip = statusMap[status].tooltip;
  }

  const statusElement = (
    <EuiToolTip position="left" content={tooltip}>
      {status === 'isLoading' ? (
        <span className="euiLoadingSpinner euiLoadingSpinner--medium" />
      ) : (
        <div className="statusIcon">
          <EuiIcon color={color} type={icon} />
          <span className="statusLabel">{label}</span>
        </div>
      )}
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
   * Status of the current query 'notYetSaved', 'saved', 'noNewChanges' or 'isLoading'.
   */
  status: PropTypes.string,
  /**
   * Label to go with status elements (e.g. KQL).
   */
  label: PropTypes.node,
  action: PropTypes.node,
};

EuiSuggestInput.defaultProps = {};
