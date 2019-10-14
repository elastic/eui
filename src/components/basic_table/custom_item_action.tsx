import React, { Component, cloneElement } from 'react';
import { CustomItemAction as Action } from './action_types';
import { Item, ItemId } from './table_types';

interface Props {
  action: Action;
  enabled: boolean;
  item: Item;
  itemId?: ItemId;
  className: string;
  index?: number;
}

interface State {
  hasFocus: boolean;
}

export class CustomItemAction extends Component<Props, State> {
  private mounted: boolean;

  constructor(props: Props) {
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

  componentDidMount() {
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
    const { action, enabled, item, className } = this.props;
    const tool = action.render(item, enabled);
    const clonedTool = cloneElement(tool, {
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    });
    const style = this.hasFocus() ? { opacity: 1 } : undefined;
    return (
      <div style={style} className={className}>
        {clonedTool}
      </div>
    );
  }
}
