import React from 'react';
import { isString } from '../../../services/predicate';
import { EuiButton, EuiButtonIcon } from '../../button';
import { SIZES } from '../../button/button';
import { ICON_TYPES } from '../../icon';
import PropTypes from 'prop-types';
import { COLORS as BUTTON_ICON_COLORS } from '../../button/button_icon/button_icon';

export const DefaultContextualActionType = PropTypes.shape({
  type: PropTypes.oneOf(['icon', 'button']),
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired, // (ctx) => void,
  available: PropTypes.func, // (ctx) => boolean;
  enabled: PropTypes.func, // (ctx) => boolean;
  size: PropTypes.arrayOf(SIZES),
  icon: PropTypes.oneOfType([ // required when type is 'icon'
    PropTypes.oneOf(ICON_TYPES),
    PropTypes.func // (ctx) => oneOf(ICON_TYPES)
  ]),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(BUTTON_ICON_COLORS),
    PropTypes.func // (ctx) => oneOf(ICON_BUTTON_COLORS)
  ])
});

const actionDefaults = {
  type: 'button',
  color: 'primary',
  size: 's'
};

export class DefaultContextualAction extends React.Component {

  static propTypes = {
    action: DefaultContextualActionType.isRequired,
    actionContext: PropTypes.any.isRequired,
    enabled: PropTypes.bool,
    visible: PropTypes.bool
  };

  static defaultProps = {
    enabled: true,
    visible: true
  };

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
    const { action, enabled, visible, actionContext } = this.props;
    if (!action.onClick) {
      throw new Error(`Cannot render item action [${action.name}]. Missing required 'onClick' callback. If you want
      to provide a custom action control, make sure to define the 'render' callback`);
    }
    const onClick = () => action.onClick(actionContext);
    const color = this.resolveActionColor(action, actionContext);
    const icon = this.resolveActionIcon(action, actionContext);
    const style = this.hasFocus() || visible ? { opacity: 1 } : { opacity: 0 };
    if (action.type === 'icon') {
      if (!icon) {
        throw new Error(`Cannot render action [${action.name}]. It is configured to render as an icon but no
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
        size={action.size}
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

  resolveActionIcon(action, actionContext) {
    if (action.icon) {
      return isString(action.icon) ? action.icon : action.icon(actionContext);
    }
  }

  resolveActionColor(action, actionContext) {
    if (action.color) {
      return isString(action.color) ? action.color : action.color(actionContext);
    }
    return actionDefaults.color;
  }
}
