import React from 'react';
import { DefaultItemAction } from './default_item_action';
import { CustomItemAction } from './custom_item_action';

export const ExpandedItemActions = ({ actions, visible, itemId, item, actionEnabled }) => {

  return actions.reduce((tools, action, index) => {
    const available = action.available ? action.available(item) : true;
    if (!available) {
      return tools;
    }
    const enabled = actionEnabled(action);
    const key = `item_action_${itemId}_${index}`;
    if (action.render) {
      // custom action has a render function
      tools.push(
        <CustomItemAction
          key={key}
          index={index}
          action={action}
          enabled={enabled}
          visible={visible}
          itemId={itemId}
          item={item}
        />
      );
    } else {
      tools.push(
        <DefaultItemAction
          key={key}
          index={index}
          action={action}
          enabled={enabled}
          visible={visible}
          itemId={itemId}
          item={item}
        />
      );
    }
    return tools;
  }, []);
};
