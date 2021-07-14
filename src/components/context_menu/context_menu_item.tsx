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
  cloneElement,
  Component,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { EuiIcon } from '../icon';
import { EuiToolTip, ToolTipPositions } from '../tool_tip';

import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';

export type EuiContextMenuItemIcon = ReactElement<any> | string | HTMLElement;

export type EuiContextMenuItemLayoutAlignment = 'center' | 'top' | 'bottom';

const sizeToClassNameMap = {
  s: 'euiContextMenuItem--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

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
  size?: keyof typeof sizeToClassNameMap;
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

export class EuiContextMenuItem extends Component<Props> {
  render() {
    const {
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
      size,
      ...rest
    } = this.props;
    let iconInstance;

    const isHrefValid = !href || validateHref(href);
    const disabled = _disabled || !isHrefValid;

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

    const classes = classNames(
      'euiContextMenuItem',
      size && sizeToClassNameMap[size],
      className,
      {
        'euiContextMenuItem-isDisabled': disabled,
      }
    );

    const layoutClasses = classNames(
      'euiContextMenu__itemLayout',
      layoutAlignToClassNames[layoutAlign]
    );

    const buttonInner = (
      <span className={layoutClasses}>
        {iconInstance}
        <span className="euiContextMenuItem__text">{children}</span>
        {arrow}
      </span>
    );

    let button;
    // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
    // this is a button and piggyback off its disabled styles.
    if (href && !disabled) {
      const secureRel = getSecureRelForTarget({ href, target, rel });

      button = (
        <a
          className={classes}
          href={href}
          target={target}
          rel={secureRel}
          ref={buttonRef as Ref<HTMLAnchorElement>}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {buttonInner}
        </a>
      );
    } else {
      button = (
        <button
          disabled={disabled}
          className={classes}
          type="button"
          ref={buttonRef}
          {...rest}>
          {buttonInner}
        </button>
      );
    }

    if (toolTipContent) {
      return (
        <EuiToolTip
          title={toolTipTitle ? toolTipTitle : null}
          content={toolTipContent}
          anchorClassName="eui-displayBlock"
          position={toolTipPosition}>
          {button}
        </EuiToolTip>
      );
    } else {
      return button;
    }
  }
}
