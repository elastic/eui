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
  EuiDisabledProps,
} from '../../services';
import { validateHref } from '../../services/security/href_validator';
import { ExclusiveUnion, CommonProps } from '../common';
import { useInnerText } from '../inner_text';
import { EuiIcon, IconType, EuiIconProps } from '../icon';
import { EuiToolTipProps } from '../tool_tip';
import {
  EuiListItemLayout,
  EuiListItemLayoutAsAnchor,
  EuiListItemLayoutAsButton,
  EuiListItemLayoutAsLi,
  type EuiListItemLayoutProps,
} from '../list_item_layout/_list_item_layout';

import {
  EuiListGroupItemExtraAction,
  EuiListGroupItemExtraActionProps,
} from './list_group_item_extra_action';
import {
  euiListGroupItemStyles,
  euiListGroupItemTooltipStyles,
} from './list_group_item.styles';

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
  > &
  EuiDisabledProps & {
    /**
     * By default the item will get the color `text`.
     * You can customize the color of the item by passing a color name.
     * @default 'text'
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
  color = 'text',
  showToolTip = false,
  wrapText,
  buttonRef,
  toolTipText,
  toolTipProps,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const isDisabled = _isDisabled || !isHrefValid;

  let iconNode;

  if (iconType) {
    iconNode = (
      <EuiIcon
        color="inherit" // forces the icon to inherit its parent color
        {...iconProps}
        type={iconType}
        className={classNames('euiListGroupItem__icon', iconProps?.className)}
        css={iconProps?.css}
      />
    );

    if (icon) {
      console.warn(
        'Both `iconType` and `icon` were passed to EuiListGroupItem but only one can exist. The `iconType` was used.'
      );
    }
  } else if (icon) {
    iconNode = cloneElementWithCss(icon, {
      css: iconProps?.css,
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

    extraActionNode = (
      <EuiListGroupItemExtraAction
        color={color === 'subdued' ? 'text' : color}
        iconType={iconType}
        alwaysShow={alwaysShow}
        {...rest}
        isDisabled={actionIsDisabled}
        parentIsDisabled={isDisabled}
      />
    );
  }

  // Only add the label as the title attribute if it's possibly truncated
  // Also ensure the value of the title attribute is a string
  const [ref, innerText] = useInnerText();
  const shouldRenderTitle = !wrapText && !showToolTip;
  const labelProps = {
    ref: shouldRenderTitle ? ref : undefined,
    className: 'euiListGroupItem__label',
    title: shouldRenderTitle
      ? typeof label === 'string'
        ? label
        : innerText
      : undefined,
  };

  const styles = useEuiMemoizedStyles(euiListGroupItemStyles);
  const cssInnerStyles = [
    styles.euiListGroupItem__inner,
    !isDisabled && !isActive && styles[color],
  ];

  let itemProps = {} as EuiListItemLayoutProps;

  if (href && !isDisabled) {
    itemProps = {
      element: 'a',
      className: 'euiListGroupItem__button',
      css: cssInnerStyles,
      href,
      target,
      rel: getSecureRelForTarget({ href, rel, target }),
      external,
      onClick: onClick as AnchorHTMLAttributes<HTMLAnchorElement>['onClick'],
      ...(rest as AnchorHTMLAttributes<HTMLAnchorElement>),
    } as EuiListItemLayoutAsAnchor;
  } else if ((href && isDisabled) || onClick) {
    itemProps = {
      element: 'button',
      type: 'button',
      className: 'euiListGroupItem__button',
      css: cssInnerStyles,
      onClick: onClick,
      ref: buttonRef,
      ...(rest as ButtonHTMLAttributes<HTMLButtonElement>),
    } as EuiListItemLayoutAsButton;
  } else {
    itemProps = {
      element: 'li',
      className: 'euiListGroupItem__text',
      css: cssInnerStyles,
      ...rest,
    } as EuiListItemLayoutAsLi;
  }

  const {
    className: itemClassName,
    css: itemCss,
    ...restItemProps
  } = itemProps;
  const classes = classNames('euiListGroupItem', className, itemClassName);

  const cssStyles = [styles.euiListGroupItem, itemCss, customCss];
  const tooltipStyles = euiListGroupItemTooltipStyles;

  const _tooltipProps = showToolTip
    ? ({
        content: toolTipText ?? label,
        position: 'right',
        ...toolTipProps,
        anchorClassName: classNames(
          'euiListGroupItem__tooltip',
          toolTipProps?.anchorClassName
        ),
        anchorProps: {
          ...toolTipProps?.anchorProps,
          css: [
            tooltipStyles.euiListGroupItem__tooltip,
            toolTipProps?.anchorProps?.css,
          ],
        },
      } as EuiToolTipProps)
    : undefined;

  return (
    <EuiListItemLayout
      className={classes}
      wrapperElement="li"
      css={cssStyles}
      style={style}
      {...restItemProps}
      tooltipProps={_tooltipProps}
      showIndicator={false}
      isSelected={isActive}
      isDisabled={isDisabled}
      prepend={iconNode}
      extraAction={extraActionNode}
      textWrap={wrapText ? 'wrap' : 'truncate'}
      textProps={labelProps}
    >
      {label}
    </EuiListItemLayout>
  );
};
