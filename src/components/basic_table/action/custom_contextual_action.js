import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

export const CustomContextualActionType = PropTypes.shape({
  render: PropTypes.func.isRequired,  // (ctx, enabled) => PropTypes.node;
  available: PropTypes.func, // (ctx) => boolean;
  enabled: PropTypes.func // (ctx) => boolean;
});

export class CustomContextualAction extends React.Component {

  static propTypes = {
    action: CustomContextualActionType.isRequired,
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
    const tool = action.render(actionContext, enabled);
    const clonedTool = cloneElement(tool, { onFocus: this.onFocus, onBlur: this.onBlur });
    const style = this.hasFocus() || visible ? { opacity: 1 } : { opacity: 0 };
    return (
      <div style={style}>
        {clonedTool}
      </div>
    );
  }
}
