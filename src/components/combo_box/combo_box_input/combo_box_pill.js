import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '../../icon';

export const EuiComboBoxPill =({
  children,
  className,
  option,
  onClose,
  ...rest
}) => {
  const classes = classNames('euiComboBoxPill', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      <div className="euiComboBoxPill__label">
        {children}
      </div>

      <button
        className="euiComboBoxPill__close"
        onClick={() => onClose(option)}
        tabIndex="-1"
      >
        <EuiIcon type="cross" className="euiComboBoxPill__closeIcon" />
      </button>
    </div>
  );
};

EuiComboBoxPill.propTypes = {
  option: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
