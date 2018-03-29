import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiBadge,
} from '../../badge';

export const EuiComboBoxPill =({
  children,
  className,
  option,
  onClose,
  color,
  ...rest
}) => {
  const classes = classNames('euiComboBoxPill', className);

  return (
    <EuiBadge
      className={classes}
      title={children}
      iconOnClick={() => onClose(option)}
      iconType="cross"
      iconSide="right"
      color={color}
      closeButtonProps={{
        tabIndex: '-1'
      }}
      {...rest}
    >
      {children}
    </EuiBadge>
  );
};

EuiComboBoxPill.propTypes = {
  option: PropTypes.object.isRequired,
  children: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

EuiComboBoxPill.defaultProps = {
  color: 'hollow',
};
