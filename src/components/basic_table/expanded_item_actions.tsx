import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { DefaultItemAction } from './default_item_action';
import { CustomItemAction } from './custom_item_action';
import {
  Action,
  CustomItemAction as CustomAction,
  DefaultItemAction as DefaultAction,
} from './action_types';

interface Props {
  actions: Action[];
  itemId: any;
  item: any;
  actionEnabled: any;
  className?: string;
}

export const ExpandedItemActions: FunctionComponent<Props> = ({
  actions,
  itemId,
  item,
  actionEnabled,
  className,
}: Props) => {
  const moreThanThree = actions.length > 2;

  return (
    <>
      {actions.reduce<React.ReactNode[]>((tools, action, index) => {
        const available = action.available ? action.available(item) : true;
        if (!available) {
          return tools;
        }

        const enabled = actionEnabled(action);

        const key = `item_action_${itemId}_${index}`;

        const classes = classNames(className, {
          expandedItemActions__completelyHide: moreThanThree && index < 2,
        });

        if ((action as CustomAction).render) {
          // custom action has a render function
          tools.push(
            <CustomItemAction
              key={key}
              className={classes}
              index={index}
              action={action as CustomAction}
              enabled={enabled}
              itemId={itemId}
              item={item}
            />
          );
        } else {
          tools.push(
            <DefaultItemAction
              key={key}
              className={classes}
              index={index}
              action={action as DefaultAction}
              enabled={enabled}
              itemId={itemId}
              item={item}
            />
          );
        }
        return tools;
      }, [])}
    </>
  );
};
