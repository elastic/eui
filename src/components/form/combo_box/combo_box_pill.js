import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '../../../components';

export const EuiComboBoxPill = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiComboBoxPill', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
      <button className="euiComboBoxPill__close">
        <EuiIcon type="cross" className="euiComboBoxPill__closeIcon" />
      </button>
    </div>
  );
};

EuiComboBoxPill.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
