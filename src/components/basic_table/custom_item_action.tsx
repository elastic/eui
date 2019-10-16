import React, { Component, cloneElement } from 'react';
import { CustomItemAction as Action } from './action_types';
import { ItemId } from './table_types';

export interface CustomItemActionProps<T> {
  action: Action<T>;
  enabled: boolean;
  item: T;
  itemId?: ItemId<T>;
  className: string;
  index?: number;
}

interface State {
  hasFocus: boolean;
}

export class CustomItemAction<T> extends Component<
  CustomItemActionProps<T>,
  State
> {
  private mounted: boolean;

  constructor(props: CustomItemActionProps<T>) {
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
