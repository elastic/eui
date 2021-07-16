/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Fragment,
  HTMLAttributes,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  ReactElement,
  MouseEventHandler,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';

import { EuiButtonIcon, EuiButtonIconPropsForButton } from '../button';
import { EuiIcon, IconType, EuiIconProps } from '../icon';
import { EuiToolTip } from '../tool_tip';
import { useInnerText } from '../inner_text';
import { ExclusiveUnion, CommonProps } from '../common';

import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';

type ItemSize = 'xs' | 's' | 'm' | 'l';
const sizeToClassNameMap: { [size in ItemSize]: string } = {
  xs: 'euiListGroupItem--xSmall',
  s: 'euiListGroupItem--small',
  m: 'euiListGroupItem--medium',
  l: 'euiListGroupItem--large',
};
export const SIZES = Object.keys(sizeToClassNameMap) as ItemSize[];

type Color = 'inherit' | 'primary' | 'text' | 'subdued' | 'ghost';
const colorToClassNameMap: { [color in Color]: string } = {
  inherit: '',
  primary: 'euiListGroupItem--primary',
  text: 'euiListGroupItem--text',
  subdued: 'euiListGroupItem--subdued',
  ghost: 'euiListGroupItem--ghost',
};
export const COLORS = Object.keys(colorToClassNameMap) as Color[];

export type EuiListGroupItemProps = CommonProps &
  Omit<
    ExclusiveUnion<
      ExclusiveUnion<
        ButtonHTMLAttributes<HTMLButtonElement>,
        Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
      >,
      HTMLAttributes<HTMLSpanElement>
    >,
    'onClick' | 'color' | 'target' | 'rel'
  > & {
    /**
     * Size of the label text
     */
    size?: ItemSize;
    /**
     * By default the item will inherit the color of its wrapper (button/link/span),
     * otherwise pass one of the acceptable options
     */
    color?: Color;

    /**
     * Content to be displayed in the list item
     */
    label: ReactNode;

    /**
     * Apply styles indicating an item is active
     */
    isActive?: boolean;

    /**
     * Apply styles indicating an item is disabled
     */
    isDisabled?: boolean;

    /**
     * Make the list item label a link.
     * While permitted, `href` and `onClick` should not be used together in most cases and may create problems.
     */
    href?: string;

    target?: string;

    rel?: string;

    /**
     * Adds `EuiIcon` of `EuiIcon.type`
     */
    iconType?: IconType;

    /**
     * Further extend the props applied to EuiIcon
     */
    iconProps?: Omit<EuiIconProps, 'type'>;

    /**
     * Custom node to pass as the icon. Cannot be used in conjunction
     * with `iconType` and `iconProps`.
     */
    icon?: ReactElement;

    /**
     * Display tooltip on list item
     */
    showToolTip?: boolean;

    /**
     * Adds an `EuiButtonIcon` to the right side of the item; `iconType` is required;
     * pass `alwaysShow` if you don't want the default behavior of only showing on hover
     */
    extraAction?: EuiButtonIconPropsForButton & {
      alwaysShow?: boolean;
    };

    /**
     * Make the list item label a button.
     * While permitted, `href` and `onClick` should not be used together in most cases and may create problems.
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /**
     * Allow link text to wrap
     */
    wrapText?: boolean;

    /**
     * Pass-through ref reference specifically for targeting
     * instances where the item content is rendered as a `button`
     */
    buttonRef?: React.Ref<HTMLButtonElement>;
  };

export const EuiListGroupItem: FunctionComponent<EuiListGroupItemProps> = ({
  label,
  isActive = false,
  isDisabled: _isDisabled = false,
  href,
  target,
  rel,
  className,
  iconType,
  icon,
  iconProps,
  extraAction,
  onClick,
  size = 'm',
  color = 'inherit',
  showToolTip = false,
  wrapText,
  buttonRef,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;

  const classes = classNames(
    'euiListGroupItem',
    sizeToClassNameMap[size],
    colorToClassNameMap[color],
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
      <EuiIcon
        color="inherit" // forces the icon to inherit its parent color
        {...iconProps}
        type={iconType}
        className={classNames('euiListGroupItem__icon', iconProps?.className)}
      />
    );

    if (icon) {
      console.warn(
        'Both `iconType` and `icon` were passed to EuiListGroupItem but only one can exist. The `iconType` was used.'
      );
    }
  } else if (icon) {
    iconNode = React.cloneElement(icon, {
      className: classNames('euiListGroupItem__icon', icon.props.className),
    });
  }

  let extraActionNode;

  if (extraAction) {
    const {
      iconType,
      alwaysShow,
      className,
      isDisabled: actionIsDisabled,
      ...rest
    } = extraAction;

    const extraActionClasses = classNames(
      'euiListGroupItem__extraAction',
      {
        'euiListGroupItem__extraAction-alwaysShow': alwaysShow,
      },
      className
    );

    extraActionNode = (
      <EuiButtonIcon
        className={extraActionClasses}
        iconType={iconType}
        {...rest}
        disabled={isDisabled || actionIsDisabled}
      />
    );
  }

  // Only add the label as the title attribute if it's possibly truncated
  // Also ensure the value of the title attribute is a string
  const [ref, innerText] = useInnerText();
  const shouldRenderTitle = !wrapText && !showToolTip;
  const labelContent = shouldRenderTitle ? (
    <span
      ref={ref}
      className="euiListGroupItem__label"
      title={typeof label === 'string' ? label : innerText}>
      {label}
    </span>
  ) : (
    <span className="euiListGroupItem__label">{label}</span>
  );

  // Handle the variety of interaction behavior
  let itemContent;

  const secureRel = getSecureRelForTarget({ href, rel, target });

  if (href && !isDisabled) {
    itemContent = (
      <a
        className="euiListGroupItem__button"
        href={href}
        target={target}
        rel={secureRel}
        onClick={onClick as AnchorHTMLAttributes<HTMLAnchorElement>['onClick']}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {iconNode}
        {labelContent}
      </a>
    );
  } else if ((href && isDisabled) || onClick) {
    itemContent = (
      <button
        type="button"
        className="euiListGroupItem__button"
        disabled={isDisabled}
        onClick={onClick}
        ref={buttonRef}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
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
          delay="long">
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

  return <Fragment>{itemContent}</Fragment>;
};
