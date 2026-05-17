/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  PropsWithChildren,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  FunctionComponent,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import classNames from 'classnames';

import {
  useEuiMemoizedStyles,
  getSecureRelForTarget,
  cloneElementWithCss,
} from '../../services';
import { validateHref } from '../../services/security/href_validator';
import { type _EuiExtendedButtonColor } from '../../global_styling';
import { CommonProps, keysOf } from '../common';
import { EuiIcon, type IconType } from '../icon';
import { EuiToolTipProps } from '../tool_tip';

import { euiContextMenuItemStyles } from './context_menu_item.styles';
import { EuiListItemLayout, EuiListItemLayoutProps } from '../list_item_layout';

export type EuiContextMenuItemIcon = IconType | ReactElement<any> | HTMLElement;

export type EuiContextMenuItemLayoutAlignment = 'center' | 'top' | 'bottom';

export interface EuiContextMenuItemProps
  extends PropsWithChildren,
    CommonProps {
  icon?: EuiContextMenuItemIcon;
  hasPanel?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  buttonRef?: Ref<HTMLButtonElement>;
  role?: HTMLAttributes<HTMLElement>['role'];
  /**
   * Required if using a tooltip. Add an optional tooltip on hover
   */
  toolTipContent?: ReactNode;
  /**
   * Optional configuration to pass to the underlying [EuiToolTip](/#/display/tooltip).
   * Accepts any prop that EuiToolTip does, except for `content` and `children`.
   */
  toolTipProps?: Partial<Omit<EuiToolTipProps, 'content' | 'children'>>;
  href?: string;
  target?: string;
  rel?: string;
  /**
   * @deprecated - will be removed in the future and handled statically as `center`
   * How to align icon with content of button
   */
  layoutAlign?: EuiContextMenuItemLayoutAlignment;
  /**
   * Applies a color to the text and icon of the item.
   *
   * Deprecated: This won't match all `EuiButtonEmpty` colors in the near future.
   * Use supported variants "text" and "danger".
   *
   */
  color?: _EuiExtendedButtonColor;
  /**
   * Set to true to show an icon indicating that it is an external link;
   * Defaults to true if `target="_blank"`
   */
  external?: boolean;
}

type Props = CommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'onClick' | 'disabled'
  > &
  EuiContextMenuItemProps;

const layoutAlignToClassNames: {
  [align in EuiContextMenuItemLayoutAlignment]: string | null;
} = {
  center: null,
  top: 'euiContextMenu__itemLayout--top',
  bottom: 'euiContextMenu__itemLayout--bottom',
};

export const LAYOUT_ALIGN = keysOf(layoutAlignToClassNames);

export const EuiContextMenuItem: FunctionComponent<Props> = ({
  children,
  className,
  hasPanel,
  icon,
  buttonRef,
  disabled: _disabled,
  layoutAlign = 'center',
  toolTipContent,
  toolTipProps,
  href,
  target,
  rel,
  color = 'text',
  external,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;

  const classes = classNames('euiContextMenuItem', className);
  const anchorClasses = classNames(
    'eui-displayBlock',
    toolTipProps?.anchorClassName
  );

  const styles = useEuiMemoizedStyles(euiContextMenuItemStyles);
  const cssStyles = [
    styles.euiContextMenuItem,
    styles.layoutAlign[layoutAlign],
    !disabled && color !== 'text' && styles.colors[color],
  ];
  const textStyles = [styles.text.euiContextMenuItem__text];

  const iconInstance =
    icon &&
    (typeof icon === 'string' ? (
      <EuiIcon
        type={icon}
        size="m"
        className="euiContextMenu__icon"
        css={styles.euiContextMenu__icon}
        color="inherit" // forces the icon to inherit its parent color
      />
    ) : (
      // Assume it's already an instance of an icon.
      cloneElementWithCss(icon, {
        css: styles.euiContextMenu__icon,
      })
    ));

  const arrow = hasPanel && (
    <EuiIcon
      type="chevronSingleRight"
      size="m"
      className="euiContextMenu__arrow"
      css={styles.euiContextMenuItem__arrow}
    />
  );

  const isLink = href && !disabled;
  const isButton = !isLink && (href || rest.onClick || toolTipContent);

  const commonProps = {
    css: cssStyles,
    className: classes,
  };

  const buttonProps = isButton
    ? {
        element: 'button',
        type: 'button',
        ref: buttonRef,
        ...rest,
      }
    : {};

  const secureRel = isLink
    ? getSecureRelForTarget({ href, target, rel })
    : undefined;

  const linkProps = isLink
    ? {
        element: 'a',
        href,
        target,
        rel: secureRel,
        ref: buttonRef as Ref<HTMLAnchorElement>,
        external,
        ...(rest as AnchorHTMLAttributes<HTMLAnchorElement>),
      }
    : {};

  const divProps =
    !isButton && !isLink
      ? {
          element: 'div',
          ref: buttonRef as Ref<HTMLDivElement>,
          ...(rest as HTMLAttributes<HTMLDivElement>),
        }
      : {};

  const props = {
    ...commonProps,
    ...divProps,
    ...buttonProps,
    ...linkProps,
  } as EuiListItemLayoutProps;

  return (
    <EuiListItemLayout
      {...props}
      role={props.role}
      showIndicator={false}
      prepend={iconInstance}
      append={arrow}
      textWrap="wrap"
      isDisabled={disabled}
      textProps={{
        className: 'euiContextMenuItem__text',
        css: textStyles,
      }}
      tooltipProps={
        toolTipContent
          ? {
              ...toolTipProps,
              position: 'right',
              anchorClassName: anchorClasses,
              content: toolTipContent,
            }
          : undefined
      }
    >
      {children}
    </EuiListItemLayout>
  );
};
