/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { DefaultItemAction } from './default_item_action';
import { CustomItemAction } from './custom_item_action';
import {
  Action,
  CustomItemAction as CustomAction,
  DefaultItemAction as DefaultAction,
  isCustomItemAction,
} from './action_types';
import { ItemIdResolved } from './table_types';

export interface ExpandedItemActionsProps<T> {
  actions: Array<Action<T>>;
  itemId: ItemIdResolved;
  item: T;
  actionEnabled: (action: Action<T>) => boolean;
  className?: string;
}

export const ExpandedItemActions = <T extends {}>({
  actions,
  itemId,
  item,
  actionEnabled,
  className,
}: ExpandedItemActionsProps<T>): ReactElement => {
  const moreThanThree = actions.length > 2;

  return (
    <>
      {actions.reduce<ReactNode[]>((tools, action, index) => {
        const available = action.available ? action.available(item) : true;
        if (!available) {
          return tools;
        }

        const enabled = actionEnabled(action);

        const key = `item_action_${itemId}_${index}`;

        const classes = classNames(className, {
          expandedItemActions__completelyHide: moreThanThree && index < 2,
        });

        if (isCustomItemAction(action)) {
          // custom action has a render function
          tools.push(
            <CustomItemAction
              key={key}
              className={classes}
              index={index}
              action={action as CustomAction<T>}
              enabled={enabled}
              item={item}
            />
          );
        } else {
          tools.push(
            <DefaultItemAction
              key={key}
              className={classes}
              action={action as DefaultAction<T>}
              enabled={enabled}
              item={item}
            />
          );
        }
        return tools;
      }, [])}
    </>
  );
};
