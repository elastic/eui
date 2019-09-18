import React, { Component } from 'react';
import { isString } from '../../services/predicate';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiToolTip } from '../tool_tip';

const defaults = {
  color: 'primary',
};

export class DefaultItemAction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { action, enabled, item, className } = this.props;

    if (!action.onClick && !action.href) {
      throw new Error(`Cannot render item action [${
        action.name
      }]. Missing required 'onClick' callback
        or 'href' string. If you want to provide a custom action control, make sure to define the 'render' callback`);
    }

    const onClick = action.onClick ? () => action.onClick(item) : undefined;
    const color = this.resolveActionColor();
    const icon = this.resolveActionIcon();

    let button;
    if (action.type === 'icon') {
      if (!icon) {
        throw new Error(`Cannot render item action [${
          action.name
        }]. It is configured to render as an icon but no
        icon is provided. Make sure to set the 'icon' property of the action`);
      }
      button = (
        <EuiButtonIcon
          className={className}
          aria-label={action.name}
          isDisabled={!enabled}
          color={color}
          iconType={icon}
          onClick={onClick}
          href={action.href}
          target={action.target}
          data-test-subj={action['data-test-subj']}
        />
      );
    } else {
      button = (
        <EuiButtonEmpty
          className={className}
          size="s"
          isDisabled={!enabled}
          color={color}
          iconType={icon}
          onClick={onClick}
          href={action.href}
          target={action.target}
          data-test-subj={action['data-test-subj']}
          flush="right">
          {action.name}
        </EuiButtonEmpty>
      );
    }

    return enabled && action.description ? (
      <EuiToolTip content={action.description} delay="long">
        {button}
      </EuiToolTip>
    ) : (
      button
    );
  }

  resolveActionIcon() {
    const { action, item } = this.props;
    if (action.icon) {
      return isString(action.icon) ? action.icon : action.icon(item);
    }
  }

  resolveActionColor() {
    const { action, item } = this.props;
    if (action.color) {
      return isString(action.color) ? action.color : action.color(item);
    }
    return defaults.color;
  }
}
