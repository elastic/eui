/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component } from 'react';
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
  render() {
    const { action, enabled, item, className } = this.props;
    return <div className={className}>{action.render(item, enabled)}</div>;
  }
}
