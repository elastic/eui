import React from 'react';
import classNames from 'classnames';
import { DefaultItemAction } from './default_item_action';
import { CustomItemAction } from './custom_item_action';

export const ExpandedItemActions = ({
  actions,
  itemId,
  item,
  actionEnabled,
  className,
}) => {
  const moreThanThree = actions.length > 2;

  return actions.reduce((tools, action, index) => {
    const available = action.available ? action.available(item) : true;
    if (!available) {
      return tools;
    }

    const enabled = actionEnabled(action);

    const key = `item_action_${itemId}_${index}`;

    const classes = classNames(className, {
      expandedItemActions__completelyHide: moreThanThree && index < 2,
    });

    if (action.render) {
      // custom action has a render function
      tools.push(
        <CustomItemAction
          key={key}
          className={classes}
          index={index}
          action={action}
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
          action={action}
          enabled={enabled}
          itemId={itemId}
          item={item}
        />
      );
    }
    return tools;
  }, []);
};
