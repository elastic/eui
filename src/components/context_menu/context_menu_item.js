import React, {
  cloneElement,
  Component,
  Fragment,
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
     * Optional if adding a tooltip. Add an optional tooltip on hover
     */
    toolTipTitle: PropTypes.node,
    /**
     * Required if using a tooltip. Add an optional tooltip on hover
     */
    toolTipContent: PropTypes.node,
  };

  render() {
    console.log(this.props);

    const {
      children,
      className,
      hasPanel,
      icon,
      buttonRef,
      disabled,
      toolTipTitle,
      toolTipContent,
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

    if (toolTipTitle || toolTipContent) {
      return (
        <EuiToolTip
          title={toolTipTitle ? toolTipTitle : null}
          content={toolTipContent ? toolTipContent : null}
          anchorClassName="eui-displayBlock"
          position="right"
        >
          {button}
        </EuiToolTip>
      );
    } else {
      return (
        <Fragment>
          {button}
        </Fragment>
      );
    }

  }
}
