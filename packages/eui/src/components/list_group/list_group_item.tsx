/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  ReactElement,
  MouseEventHandler,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';

import {
  getSecureRelForTarget,
  useEuiMemoizedStyles,
  cloneElementWithCss,
} from '../../services';
import { validateHref } from '../../services/security/href_validator';
import { ExclusiveUnion, CommonProps } from '../common';
import { useInnerText } from '../inner_text';
import { EuiIcon, IconType, EuiIconProps } from '../icon';
import { EuiToolTip, EuiToolTipProps } from '../tool_tip';
import { EuiExternalLinkIcon } from '../link/external_link_icon';

import {
  EuiListGroupItemExtraAction,
  EuiListGroupItemExtraActionProps,
} from './list_group_item_extra_action';
import {
  euiListGroupItemStyles,
  euiListGroupItemIconStyles,
  euiListGroupItemInnerStyles,
  euiListGroupItemTooltipStyles,
  euiListGroupItemLabelStyles,
} from './list_group_item.styles';

export const SIZES = ['xs', 's', 'm', 'l'] as const;
export type EuiListGroupItemSize = (typeof SIZES)[number];

export const COLORS = ['primary', 'text', 'subdued'] as const;
export type EuiListGroupItemColor = (typeof COLORS)[number];

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
    size?: EuiListGroupItemSize;
    /**
     * By default the item will get the color `text`.
     * You can customize the color of the item by passing a color name.
     */
    color?: EuiListGroupItemColor;

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
    rel?: string;
    target?: string;
    /**
     * Set to true to show an icon indicating that it is an external link;
     * Defaults to true if `target="_blank"`
     */
    external?: boolean;

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
     * An object of {@link EuiListGroupItemExtraAction} props.
     * Adds an `EuiButtonIcon` to the right side of the item; `iconType` is required;
     * pass `alwaysShow` if you don't want the default behavior of only showing on hover
     */
    extraAction?: EuiListGroupItemExtraActionProps;

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

    /**
     * Text to be displayed in the tooltip when `showToolTip` is true.
     * By default the text will be same as the label text.
     */
    toolTipText?: string;

    /**
     * Allows customizing the tooltip shown when `showToolTip` is true.
     * Accepts any props that [EuiToolTip](/#/display/tooltip) accepts.
     */
    toolTipProps?: Partial<EuiToolTipProps>;
  };

export const EuiListGroupItem: FunctionComponent<EuiListGroupItemProps> = ({
  label,
  isActive = false,
  isDisabled: _isDisabled = false,
  href,
  rel,
  target,
  external,
  className,
  css: customCss,
  style,
  iconType,
  icon,
  iconProps,
  extraAction,
  onClick,
  size = 'm',
  color = 'text',
  showToolTip = false,
  wrapText,
  buttonRef,
  toolTipText,
  toolTipProps,
  ...rest
}) => {
  const isClickable = !!(href || onClick);
  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;

  const iconStyles = useEuiMemoizedStyles(euiListGroupItemIconStyles);
  const cssIconStyles = [iconStyles.euiListGroupItem__icon, iconProps?.css];

  let iconNode;

  if (iconType) {
    iconNode = (
      <EuiIcon
        color="inherit" // forces the icon to inherit its parent color
        {...iconProps}
        type={iconType}
        className={classNames('euiListGroupItem__icon', iconProps?.className)}
        css={cssIconStyles}
      />
    );

    if (icon) {
      console.warn(
        'Both `iconType` and `icon` were passed to EuiListGroupItem but only one can exist. The `iconType` was used.'
      );
    }
  } else if (icon) {
    iconNode = cloneElementWithCss(icon, {
      css: cssIconStyles,
      className: classNames('euiListGroupItem__icon', icon.props.className),
    });
  }

  let extraActionNode;

  if (extraAction) {
    const {
      iconType,
      alwaysShow,
      isDisabled: actionIsDisabled,
      ...rest
    } = extraAction;

    // EuiListGroupItemExtraActionProps extends EuiButtonIconPropsForButton
    // which doesn't have the color `subdued` so we need to assign a valid color
    // the most similar is `text` so we'll use that
    const extraActionColor: EuiListGroupItemExtraActionProps['color'] =
      color === 'subdued' ? 'text' : color;

    extraActionNode = (
      <EuiListGroupItemExtraAction
        color={extraActionColor}
        iconType={iconType}
        alwaysShow={alwaysShow}
        {...rest}
        isDisabled={actionIsDisabled}
        parentIsDisabled={isDisabled}
      />
    );
  }

  const labelStyles = euiListGroupItemLabelStyles;
  const cssLabelStyles = [
    labelStyles.euiListGroupItem__label,
    wrapText ? labelStyles.wrapText : labelStyles.truncate,
  ];

  // Only add the label as the title attribute if it's possibly truncated
  // Also ensure the value of the title attribute is a string
  const [ref, innerText] = useInnerText();
  const shouldRenderTitle = !wrapText && !showToolTip;
  const labelContent = shouldRenderTitle ? (
    <span
      ref={ref}
      className="euiListGroupItem__label"
      css={cssLabelStyles}
      title={typeof label === 'string' ? label : innerText}
    >
      {label}
    </span>
  ) : (
    <span className="euiListGroupItem__label" css={cssLabelStyles}>
      {label}
    </span>
  );

  // Handle the variety of interaction behavior
  let itemContent;

  const innerStyles = useEuiMemoizedStyles(euiListGroupItemInnerStyles);
  const cssInnerStyles = [
    innerStyles.euiListGroupItem__inner,
    innerStyles[size],
    !isDisabled && innerStyles[color],
    isActive && innerStyles.isActive,
    isDisabled && innerStyles.isDisabled,
    isClickable && !isDisabled && innerStyles.isClickable,
  ];

  if (href && !isDisabled) {
    itemContent = (
      <a
        className="euiListGroupItem__button"
        css={cssInnerStyles}
        href={href}
        target={target}
        rel={getSecureRelForTarget({ href, rel, target })}
        onClick={onClick as AnchorHTMLAttributes<HTMLAnchorElement>['onClick']}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {iconNode}
        {labelContent}
        <EuiExternalLinkIcon external={external} target={target} />
      </a>
    );
  } else if ((href && isDisabled) || onClick) {
    itemContent = (
      <button
        type="button"
        className="euiListGroupItem__button"
        css={cssInnerStyles}
        disabled={isDisabled}
        onClick={onClick}
        ref={buttonRef}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {iconNode}
        {labelContent}
      </button>
    );
  } else {
    itemContent = (
      <span className="euiListGroupItem__text" css={cssInnerStyles} {...rest}>
        {iconNode}
        {labelContent}
      </span>
    );
  }

  const styles = useEuiMemoizedStyles(euiListGroupItemStyles);
  const cssStyles = [
    styles.euiListGroupItem,
    !isDisabled && isActive && styles.colors.isActive[color],
    !isDisabled && isClickable && styles.colors.isClickable[color],
    styles[size],
    customCss,
  ];

  const classes = classNames('euiListGroupItem', className);

  if (showToolTip) {
    const tooltipStyles = euiListGroupItemTooltipStyles;
    const cssTooltipStyles = [
      tooltipStyles.euiListGroupItem__tooltip,
      toolTipProps?.anchorProps?.css,
    ];

    const anchorClasses = classNames(
      'euiListGroupItem__tooltip',
      toolTipProps?.anchorClassName
    );

    const anchorPropsAndCss = {
      ...toolTipProps?.anchorProps,
      css: cssTooltipStyles,
    };

    itemContent = (
      <li className={classes} css={cssStyles} style={style}>
        <EuiToolTip
          content={toolTipText ?? label}
          position="right"
          delay="long"
          {...toolTipProps}
          anchorClassName={anchorClasses}
          anchorProps={anchorPropsAndCss}
        >
          <>
            {itemContent}
            {extraActionNode}
          </>
        </EuiToolTip>
      </li>
    );
  } else {
    itemContent = (
      <li className={classes} css={cssStyles} style={style}>
        {itemContent}
        {extraActionNode}
      </li>
    );
  }

  return <>{itemContent}</>;
};
