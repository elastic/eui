/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
