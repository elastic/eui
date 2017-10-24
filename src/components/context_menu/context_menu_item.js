import React, {
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '..';

export const EuiContextMenuItem = ({
  children,
  className,
  hasPanel,
  icon,
  ...rest,
}) => {
  let iconInstance;

  if (icon) {
    switch (typeof icon) {
      case 'string':
        iconInstance = (
          <EuiIcon
            type={icon}
            size="medium"
            className="kuiContextMenu__icon"
          />
        );
        break;

      default:
        // Assume it's already an instance of an icon.
        iconInstance = cloneElement(icon, {
          className: 'kuiContextMenu__icon'
        });
    }
  }

  let arrow;

  if (hasPanel) {
    arrow = (
      <EuiIcon
        type="arrowRight"
        size="medium"
        className="kuiContextMenu__arrow"
      />
    );
  }

  const classes = classNames('kuiContextMenuItem', className);

  return (
    <button
      className={classes}
      {...rest}
    >
      <span className="kuiContextMenu__itemLayout">
        {iconInstance}
        <span className="kuiContextMenuItem__text">
          {children}
        </span>
        {arrow}
      </span>
    </button>
  );
};

EuiContextMenuItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClick: PropTypes.func,
  hasPanel: PropTypes.bool,
};
