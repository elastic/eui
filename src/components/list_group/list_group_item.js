import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonEmpty } from '../button';
import { ICON_TYPES, EuiIcon } from '../icon';

export const EuiListGroupItem = ({
  label,
  isActive,
  isDisabled,
  href,
  className,
  iconType,
  linkAction,
  ...rest
}) => {
  const classes = classNames(
    'euiListGroupItem',
    {
      'euiListGroupItem--active': isActive,
      'euiListGroupItem--disabled': isDisabled,
      'euiListGroupItem--hasIcon': iconType,
      'euiListGroupItem__hasAction': linkAction,
    },
    className
  );

  // For text only list item content that has an icon
  let iconContent;

  if (!href && iconType) {
    iconContent = (
      <EuiIcon type={iconType} />
    );
  }

  // Handle the variety of content that can be passed to the label prop
  // This could include a basic link, other EUI components, a secondary button,
  // or plain text with an optional icon
  let itemContent;

  if (href) {
    itemContent = (
      <EuiButtonEmpty iconType={iconType} isDisabled={isDisabled} className="euiListGroupItem__button" href={href}>
        {label}
      </EuiButtonEmpty>
    );
  } else if (typeof label === 'object' && !linkAction) {
    itemContent = label;
  } else if (linkAction) {
    itemContent = (
      <span className="euiListGroupItem__actionContent">
        <span className="euiListGroupItem__actionLabel">
          {label}
        </span>
        <span className="euiListGroupItem__actionButton">
          {linkAction}
        </span>
      </span>
    );
  } else {
    itemContent = (
      <span>
        {iconContent}
        <span className="euiListGroupItem__label">{label}</span>
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
  /**
   * Content to be displyed in the list item
   */
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
   * Make the list item label a link
   */
  href: PropTypes.string,

  /**
   * See EuiIcon
   */
  iconType: PropTypes.oneOf(ICON_TYPES),

  /**
   * Add button icon for secondary action. See EuiButtonIcon
   */
  linkAction: PropTypes.node,
};

EuiListGroupItem.defaultProps = {
  isActive: false,
  isDisabled: false,
};
