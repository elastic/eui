import React, { Component, cloneElement } from 'react';

export class CustomItemAction extends Component {

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
    const tool = action.render(item, enabled);
    const clonedTool = cloneElement(tool, { onFocus: this.onFocus, onBlur: this.onBlur });
    const style = this.hasFocus() || visible ? { opacity: 1 } : { opacity: 0 };
    return (
      <div style={style}>
        {clonedTool}
      </div>
    );
  }
}
