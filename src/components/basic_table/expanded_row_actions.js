import React from 'react';
import { DefaultRowAction } from './default_row_action';
import { CustomRowAction } from './custom_row_action';

export const ExpandedRowActions = ({
  actions,
  visible,
  rowId,
  row,
  model,
  actionEnabled,
}) => {
  return actions.reduce((tools, action, index) => {
    const isAvailable = action.isAvailable ? action.isAvailable(row, model) : true;

    if (!isAvailable) {
      return tools;
    }

    const enabled = actionEnabled(action);
    const key = `row_action_${rowId}_${index}`;
    if (action.render) {
      // custom action has a render function
      tools.push(
        <CustomRowAction
          key={key}
          index={index}
          action={action}
          enabled={enabled}
          visible={visible}
          rowId={rowId}
          row={row}
        />
      );
    } else {
      tools.push(
        <DefaultRowAction
          key={key}
          index={index}
          action={action}
          enabled={enabled}
          visible={visible}
          rowId={rowId}
          row={row}
        />
      );
    }
    return tools;
  }, []);
};
