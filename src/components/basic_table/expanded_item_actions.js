import React from 'react';
import {
  DefaultContextualAction,
  CustomContextualAction
} from './action';

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
        <CustomContextualAction
          key={key}
          index={index}
          action={action}
          actionContext={item}
          enabled={enabled}
          visible={visible}
        />
      );
    } else {
      tools.push(
        <DefaultContextualAction
          key={key}
          index={index}
          action={action}
          actionContext={item}
          enabled={enabled}
          visible={visible}
          size="s"
        />
      );
    }
    return tools;
  }, []);
};
