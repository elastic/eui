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

import { CommonProps, keysOf, Omit } from '../common';
import { EuiIcon } from '../icon';
import { EuiToolTip, ToolTipPositions } from '../tool_tip';

import { getSecureRelForTarget } from '../../services';

export type EuiContextMenuItemIcon = ReactElement<any> | string | HTMLElement;

type LayoutAlignment = 'center' | 'top' | 'bottom';

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
  layoutAlign?: LayoutAlignment;
}

type Props = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
  EuiContextMenuItemProps;

const layoutAlignToClassNames: { [align in LayoutAlignment]: string | null } = {
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
      disabled,
      layoutAlign = 'center',
      toolTipTitle,
      toolTipContent,
      toolTipPosition = 'right',
      href,
      target,
      rel,
      ...rest
    } = this.props;

    let iconInstance;

    if (icon) {
      switch (typeof icon) {
        case 'string':
          iconInstance = (
            <EuiIcon type={icon} size="m" className="euiContextMenu__icon" />
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

    const classes = classNames('euiContextMenuItem', className, {
      'euiContextMenuItem-isDisabled': disabled,
    });

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
          {...rest as AnchorHTMLAttributes<HTMLAnchorElement>}>
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
