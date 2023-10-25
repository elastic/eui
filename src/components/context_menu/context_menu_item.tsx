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
  useEuiTheme,
  getSecureRelForTarget,
  validateHref,
  cloneElementWithCss,
} from '../../services';
import { CommonProps, keysOf } from '../common';
import { EuiIcon } from '../icon';
import { EuiToolTip, EuiToolTipProps } from '../tool_tip';

import { euiContextMenuItemStyles } from './context_menu_item.styles';

export type EuiContextMenuItemIcon = ReactElement<any> | string | HTMLElement;

export type EuiContextMenuItemLayoutAlignment = 'center' | 'top' | 'bottom';

export const SIZES = ['s', 'm'] as const;

export interface EuiContextMenuItemProps
  extends PropsWithChildren,
    CommonProps {
  icon?: EuiContextMenuItemIcon;
  hasPanel?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  buttonRef?: Ref<HTMLButtonElement>;
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
   * How to align icon with content of button
   */
  layoutAlign?: EuiContextMenuItemLayoutAlignment;
  /**
   * Reduce the size to `s` when in need of a more compressed menu
   */
  size?: (typeof SIZES)[number];
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
  size = 'm',
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;

  const classes = classNames('euiContextMenuItem', className);

  const euiTheme = useEuiTheme();
  const styles = euiContextMenuItemStyles(euiTheme);
  const cssStyles = [
    styles.euiContextMenuItem,
    styles.sizes[size],
    styles.layoutAlign[layoutAlign],
    disabled && styles.disabled,
  ];

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
      cloneElementWithCss(icon as ReactElement, {
        css: styles.euiContextMenu__icon,
      })
    ));

  const arrow = hasPanel && (
    <EuiIcon
      type="arrowRight"
      size="m"
      className="euiContextMenu__arrow"
      css={styles.euiContextMenuItem__arrow}
    />
  );

  const textStyles = [
    styles.text.euiContextMenuItem__text,
    size === 's' && styles.text.s,
  ];
  const buttonContent = (
    <>
      {iconInstance}
      <span className="euiContextMenuItem__text" css={textStyles}>
        {children}
      </span>
      {arrow}
    </>
  );

  let button;
  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !disabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    button = (
      <a
        css={cssStyles}
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef as Ref<HTMLAnchorElement>}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {buttonContent}
      </a>
    );
  } else if (href || rest.onClick || toolTipContent) {
    button = (
      <button
        disabled={disabled}
        css={cssStyles}
        className={classes}
        type="button"
        ref={buttonRef}
        {...rest}
      >
        {buttonContent}
      </button>
    );
  } else {
    button = (
      <div
        css={cssStyles}
        className={classes}
        ref={buttonRef as Ref<HTMLDivElement>}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      >
        {buttonContent}
      </div>
    );
  }

  if (toolTipContent) {
    const anchorClasses = classNames(
      'eui-displayBlock',
      toolTipProps?.anchorClassName
    );
    return (
      <EuiToolTip
        position="right"
        {...toolTipProps}
        anchorClassName={anchorClasses}
        content={toolTipContent}
      >
        {button}
      </EuiToolTip>
    );
  } else {
    return button;
  }
};
