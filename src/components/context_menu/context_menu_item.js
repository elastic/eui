import React, {
  cloneElement,
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../icon';
import { EuiToolTip } from '../tool_tip';

export class EuiContextMenuItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    /**
     * Icon used for the item
     */
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    onClick: PropTypes.func,
    /**
     * Whether the item leads to a new set of items
     */
    hasPanel: PropTypes.bool,
    buttonRef: PropTypes.func,
    disabled: PropTypes.bool,
    /**
     * Required if using a tooltip. Add an optional tooltip on hover
     */
    toolTipContent: PropTypes.node,
    /**
     * Optional title for the tooltip
     */
    toolTipTitle: PropTypes.node,
    /**
     * Dictates the position of the tooltip.
     */
    toolTipPosition: PropTypes.string,
  };

  render() {

    const {
      children,
      className,
      hasPanel,
      icon,
      buttonRef,
      disabled,
      toolTipTitle,
      toolTipContent,
      toolTipPosition,
      ...rest
    } = this.props;

    let iconInstance;

    if (icon) {
      switch (typeof icon) {
        case 'string':
          iconInstance = (
            <EuiIcon
              type={icon}
              size="m"
              className="euiContextMenu__icon"
            />
          );
          break;

        default:
          // Assume it's already an instance of an icon.
          iconInstance = cloneElement(icon, {
            className: 'euiContextMenu__icon'
          });
      }
    }

    let arrow;

    if (hasPanel) {
      arrow = (
        <EuiIcon
          type="arrowRight"
          size="m"
          className="euiContextMenu__arrow"
        />
      );
    }

    const classes = classNames('euiContextMenuItem', className, {
      'euiContextMenuItem-isDisabled': disabled,
    });

    const button = (
      <button
        className={classes}
        type="button"
        ref={buttonRef}
        disabled={disabled}
        {...rest}
      >
        <span className="euiContextMenu__itemLayout">
          {iconInstance}
          <span className="euiContextMenuItem__text">
            {children}
          </span>
          {arrow}
        </span>
      </button>
    );

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
      return (
        button
      );
    }

  }
}

EuiContextMenuItem.defaultProps = {
  toolTipPosition: "right",
};
