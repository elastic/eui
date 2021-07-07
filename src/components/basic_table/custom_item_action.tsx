/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, cloneElement } from 'react';
import { CustomItemAction as Action } from './action_types';

export interface CustomItemActionProps<T> {
  action: Action<T>;
  enabled: boolean;
  item: T;
  className: string;
  index?: number;
}

interface CustomItemActionState {
  hasFocus: boolean;
}

export class CustomItemAction<T> extends Component<
  CustomItemActionProps<T>,
  CustomItemActionState
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
    // unfortunately will lead to unnecessarily complex code... so we'll
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
