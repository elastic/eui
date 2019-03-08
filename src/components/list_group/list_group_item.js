import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonIcon } from '../button';
import { ICON_TYPES, EuiIcon } from '../icon';
import { EuiToolTip } from '../tool_tip';

const sizeToClassNameMap = {
  xs: 'euiListGroupItem--xSmall',
  s: 'euiListGroupItem--small',
  m: 'euiListGroupItem--medium',
  l: 'euiListGroupItem--large',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiListGroupItem = ({
  label,
  isActive,
  isDisabled,
  href,
  className,
  iconType,
  extraAction,
  onClick,
  size,
  showToolTip,
  flyoutMenu, // eslint-disable-line no-unused-vars
  ...rest
}) => {
  const classes = classNames(
    'euiListGroupItem',
    sizeToClassNameMap[size],
    {
      'euiListGroupItem-isActive': isActive,
      'euiListGroupItem-isDisabled': isDisabled,
      'euiListGroupItem-isClickable': href || onClick,
      'euiListGroupItem-hasExtraAction': extraAction,
    },
    className
  );

  let iconNode;

  if (iconType) {
    iconNode = (
      <EuiIcon className="euiListGroupItem__icon" type={iconType} />
    );
  }

  let extraActionNode;

  if (extraAction) {
    const {
      iconType,
      alwaysShow,
      ...rest
    } = extraAction;

    const extraActionClasses = classNames(
      'euiListGroupItem__extraAction',
      { 'euiListGroupItem__extraAction-alwaysShow': alwaysShow }
    );

    extraActionNode = (
      <EuiButtonIcon className={extraActionClasses} iconType={iconType} {...rest} disabled={isDisabled} />
    );
  }

  // Handle the variety of interaction behavior
  let itemContent;

  if (href && !isDisabled) {
    itemContent = (
      <a href={href} className="euiListGroupItem__button" {...rest}>
        {iconNode}
        <span className="euiListGroupItem__label">{label}</span>
      </a>
    );
  } else if ((href && isDisabled) || onClick) {
    itemContent = (
      <button
        className="euiListGroupItem__button"
        disabled={isDisabled}
        onClick={onClick}
        {...rest}
      >
        {iconNode}
        <span className="euiListGroupItem__label">{label}</span>
      </button>
    );
  } else {
    itemContent = (
      <span className="euiListGroupItem__text" {...rest}>
        {iconNode}
        <span className="euiListGroupItem__label">{label}</span>
      </span>
    );
  }

  if (showToolTip) {
    itemContent = (
      <li className={classes}>
        <EuiToolTip
          content={label}
          position="right"
          delay="long"
          size="s"
        >
          {itemContent}
        </EuiToolTip>
      </li>
    );
  } else {
    itemContent = (
      <li className={classes}>
        {itemContent}
        {extraActionNode}
      </li>
    );
  }

  return (
    <Fragment>{itemContent}</Fragment>
  );
};

EuiListGroupItem.propTypes = {
  className: PropTypes.string,

  /**
   * Set the size of the label text
   */
  size: PropTypes.oneOf(SIZES),

  /**
   * Content to be displyed in the list item
   */
  label: PropTypes.node.isRequired,

  /**
   * Apply styles indicating an item is active
   */
  isActive: PropTypes.bool,

  /**
   * Apply styles indicating an item is disabled
   */
  isDisabled: PropTypes.bool,

  /**
   * Make the list item label a link
   */
  href: PropTypes.string,

  /**
   * See `EuiIcon`
   */
  iconType: PropTypes.oneOf(ICON_TYPES),

  /**
   * Display tooltip on list item
   */
  showToolTip: PropTypes.bool,

  /**
   * Adds an `EuiButtonIcon` to the right side of the item; `iconType` is required;
   * pass `alwaysShow` if you don't want the default behavior of only showing on hover
   */
  extraAction: PropTypes.shape({
    iconType: PropTypes.oneOf(ICON_TYPES).isRequired,
    alwaysShow: PropTypes.bool,
  }),

  /**
   * See `EuiNavDrawer`. `flyoutMenu` provides a `title` and `listItems` to the
   * `EuiNavDrawerFlyout` component while also overriding the `EuiListGroupItem` `onClick` prop
   */
  flyoutMenu: PropTypes.shape({
    title: PropTypes.string,
    listItems: PropTypes.array,
  }),

  onClick: PropTypes.func,
};

EuiListGroupItem.defaultProps = {
  isActive: false,
  isDisabled: false,
  size: 'm',
  showToolTip: false,
};
