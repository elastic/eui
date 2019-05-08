import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiButtonIcon } from '../button';
import { IconPropType, EuiIcon } from '../icon';
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
  icon,
  extraAction,
  onClick,
  size,
  showToolTip,
  wrapText,
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
      'euiListGroupItem--wrapText': wrapText,
    },
    className
  );

  let iconNode;

  if (iconType) {
    iconNode = (
      <EuiIcon className="euiListGroupItem__icon" type={iconType} />
    );

    if (icon) {
      console.warn('Both `iconType` and `icon` were passed to EuiListGroupItem but only one can exist. The `iconType` was used.');
    }
  } else if (icon) {
    iconNode = React.cloneElement(icon,
      { className: classNames('euiListGroupItem__icon', icon.props.className) });
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

  // Only add the label as the title attribute if it's possibly truncated
  const labelContent = (
    <span
      className="euiListGroupItem__label"
      title={wrapText ? undefined : label}
    >
      {label}
    </span>
  );

  // Handle the variety of interaction behavior
  let itemContent;

  if (href && !isDisabled) {
    itemContent = (
      <a href={href} className="euiListGroupItem__button" {...rest}>
        {iconNode}
        {labelContent}
      </a>
    );

    if (onClick) {
      console.warn('Both `href` and `onClick` were passed to EuiListGroupItem but only one can exist. The `href` was used.');
    }
  } else if ((href && isDisabled) || onClick) {
    itemContent = (
      <button
        type="button"
        className="euiListGroupItem__button"
        disabled={isDisabled}
        onClick={onClick}
        {...rest}
      >
        {iconNode}
        {labelContent}
      </button>
    );
  } else {
    itemContent = (
      <span className="euiListGroupItem__text" {...rest}>
        {iconNode}
        {labelContent}
      </span>
    );
  }

  if (showToolTip) {
    itemContent = (
      <li className={classes}>
        <EuiToolTip
          anchorClassName="euiListGroupItem__tooltip"
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
   * Adds `EuiIcon` of `EuiIcon.type`
   */
  iconType: IconPropType,

  /**
   * Custom node to pass as the icon. Cannot be used in conjunction
   * with `iconType`.
   */
  icon: PropTypes.element,

  /**
   * Display tooltip on list item
   */
  showToolTip: PropTypes.bool,

  /**
   * Adds an `EuiButtonIcon` to the right side of the item; `iconType` is required;
   * pass `alwaysShow` if you don't want the default behavior of only showing on hover
   */
  extraAction: PropTypes.shape({
    iconType: IconPropType.isRequired,
    alwaysShow: PropTypes.bool,
  }),

  onClick: PropTypes.func,

  /**
   * Allow link text to wrap
   */
  wrapText: PropTypes.bool,
};

EuiListGroupItem.defaultProps = {
  isActive: false,
  isDisabled: false,
  size: 'm',
  showToolTip: false,
};
