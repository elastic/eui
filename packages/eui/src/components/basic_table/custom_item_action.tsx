/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { CustomItemAction as Action } from './action_types';

export interface CustomItemActionProps<T> {
  action: Action<T>;
  enabled: boolean;
  item: T;
  className: string;
  index?: number;
}

export const CustomItemAction = <T,>({
  action,
  enabled,
  item,
  className,
}: CustomItemActionProps<T>) => (
  <div className={className}>{action.render(item, enabled)}</div>
);
