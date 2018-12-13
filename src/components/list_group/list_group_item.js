import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonEmpty } from '../button';

export const EuiListGroupItem = ({
  label,
  isActive,
  isDisabled,
  href,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiListGroupItem',
    {
      'euiListGroupItem--active': isActive,
      'euiListGroupItem--disabled': isDisabled,
    },
    className
  );

  let itemContent;

  if (href) {
    itemContent = (
      <EuiButtonEmpty isDisabled={isDisabled} className="euiListGroupItem__button" href={href}>
        {label}
      </EuiButtonEmpty>
    );
  } else {
    itemContent = (
      <span>
        {label}
      </span>
    );
  }

  return (
    <li
      className={classes}
      {...rest}
    >
      {itemContent}
    </li>
  );
};

EuiListGroupItem.propTypes = {
  label: PropTypes.node.isRequired,

  /**
   * Apply styles indicating an item is active
   */
  isActive: PropTypes.bool.isRequired,

  /**
   * Apply styles indicating an item is disabled
   */
  isDisabled: PropTypes.bool.isRequired,

  /**
   * Make the list item a link
   */
  href: PropTypes.string,
};

EuiListGroupItem.defaultProps = {
  isActive: false,
  isDisabled: false,
};
