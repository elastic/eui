/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  cloneElement,
  FunctionComponent,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import classNames from 'classnames';

import { useEuiTheme, getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';
import { CommonProps, keysOf } from '../common';
import { EuiIcon } from '../icon';
import { EuiToolTip, ToolTipPositions } from '../tool_tip';

import { euiContextMenuItemStyles } from './context_menu_item.styles';

export type EuiContextMenuItemIcon = ReactElement<any> | string | HTMLElement;

export type EuiContextMenuItemLayoutAlignment = 'center' | 'top' | 'bottom';

export const SIZES = ['s', 'm'] as const;

export interface EuiContextMenuItemProps extends CommonProps {
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
   * Optional title for the tooltip
   */
  toolTipTitle?: ReactNode;
  /**
   * Dictates the position of the tooltip.
   */
  toolTipPosition?: ToolTipPositions;
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
  toolTipTitle,
  toolTipContent,
  toolTipPosition = 'right',
  href,
  target,
  rel,
  size = 'm',
  ...rest
}) => {
  const euiTheme = useEuiTheme();

  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;

  let iconInstance;
  if (icon) {
    switch (typeof icon) {
      case 'string':
        iconInstance = (
          <EuiIcon
            type={icon}
            size="m"
            className="euiContextMenu__icon"
            color="inherit" // forces the icon to inherit its parent color
          />
        );
        break;

      default:
        // Assume it's already an instance of an icon.
        iconInstance = cloneElement(icon as ReactElement, {
          className: 'euiContextMenu__icon',
        });
    }
  }

  let arrow;

  if (hasPanel) {
    arrow = (
      <EuiIcon type="arrowRight" size="m" className="euiContextMenu__arrow" />
    );
  }

  const classes = classNames('euiContextMenuItem', className);
  const styles = euiContextMenuItemStyles(euiTheme);
  const cssStyles = [
    styles.euiContextMenuItem,
    styles.sizes[size],
    styles.layoutAlign[layoutAlign],
    disabled && styles.disabled,
  ];

  const buttonContent = (
    <>
      {iconInstance}
      <span className="euiContextMenuItem__text">{children}</span>
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
  } else if (href || rest.onClick) {
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
    return (
      <EuiToolTip
        title={toolTipTitle ? toolTipTitle : null}
        content={toolTipContent}
        anchorClassName="eui-displayBlock"
        position={toolTipPosition}
      >
        {button}
      </EuiToolTip>
    );
  } else {
    return button;
  }
};
