import React, { Component } from 'react';
import { isString } from '../../services/predicate';
import { EuiButton, EuiButtonIcon } from '../button';

const defaults = {
  color: 'primary'
};

export class DefaultItemAction extends Component {

  constructor(props) {
    super(props);
    this.state = { hasFocus: false };

    // while generally considered an anti-pattern, here we require
    // to do that as the onFocus/onBlur events of the action controls
    // may trigger while this component is unmounted. An alternative
    // (at least the workarounds suggested by react is to unregister
    // the onFocus/onBlur listeners from the action controls... this
    // unfortunately will lead to unecessarily complex code... so we'll
    // stick to this approach for now)
    this.mounted = false;
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onFocus = () => {
    if (this.mounted) {
      this.setState({ hasFocus: true });
    }
  };

  onBlur = () => {
    if (this.mounted) {
      this.setState({ hasFocus: false });
    }
  };

  hasFocus = () => {
    return this.state.hasFocus;
  };

  render() {
    const { action, enabled, visible, item } = this.props;
    if (!action.onClick) {
      throw new Error(`Cannot render item action [${action.name}]. Missing required 'onClick' callback. If you want
      to provide a custom action control, make sure to define the 'render' callback`);
    }
    const onClick = () => action.onClick(item);
    const color = this.resolveActionColor();
    const icon = this.resolveActionIcon();
    const style = this.hasFocus() || visible ? { opacity: 1 } : { opacity: 0 };
    if (action.type === 'icon') {
      if (!icon) {
        throw new Error(`Cannot render item action [${action.name}]. It is configured to render as an icon but no
        icon is provided. Make sure to set the 'icon' property of the action`);
      }
      return (
        <EuiButtonIcon
          aria-label={action.name}
          isDisabled={!enabled}
          color={color}
          iconType={icon}
          title={action.description}
          style={style}
          onClick={onClick}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      );
    }

    return (
      <EuiButton
        size="s"
        isDisabled={!enabled}
        color={color}
        iconType={icon}
        fill={false}
        title={action.description}
        style={style}
        onClick={onClick}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        {action.name}
      </EuiButton>
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
