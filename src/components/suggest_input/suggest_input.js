/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiFilterButton } from '../filter_group';
import { EuiFieldText } from '../form';
import { EuiToolTip } from '../tool_tip';
import { EuiIcon } from '../icon';

export const EuiSuggestInput = ({
  className,
  status,
  label,
  value,
  ...rest
}) => {
  const filterTriggerButton = (
    <EuiFilterButton title="title">Filters</EuiFilterButton>
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

  let myIcon;
  let myColor;
  let myTooltip;

  if (statusMap[status] && statusMap[status].icon) {
    myIcon = statusMap[status].icon;
    myColor = statusMap[status].color;
    myTooltip = statusMap[status].myTooltip;
  }

  const statusElement = (
    <EuiToolTip position="left" content={myTooltip}>
      {status === 'isLoading' ? (
        <span className="euiLoadingSpinner euiLoadingSpinner--medium" />
      ) : (
        <div className="statusIcon">
          <EuiIcon color={myColor} type={myIcon} />
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
   * Status of the current query.
   */
  status: PropTypes.object,
  /**
   * Label to go with status elements (e.g. KQL).
   */
  label: PropTypes.node,
};

EuiSuggestInput.defaultProps = {};
