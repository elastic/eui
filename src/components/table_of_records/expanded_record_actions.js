import React from 'react';
import { DefaultRecordAction } from './default_record_action';
import { CustomRecordAction } from './custom_record_action';

export const ExpandedRecordActions = ({ actions, visible, recordId, record, model, actionEnabled }) => {

  return actions.reduce((tools, action, index) => {
    const available = action.available ? action.available(record, model) : true;
    if (!available) {
      return tools;
    }
    const enabled = actionEnabled(action);
    const key = `record_action_${recordId}_${index}`;
    if (action.render) {
      // custom action has a render function
      tools.push(
        <CustomRecordAction
          key={key}
          index={index}
          action={action}
          enabled={enabled}
          visible={visible}
          recordId={recordId}
          record={record}
          model={model}
        />
      );
    } else {
      tools.push(
        <DefaultRecordAction
          key={key}
          index={index}
          action={action}
          enabled={enabled}
          visible={visible}
          recordId={recordId}
          record={record}
          model={model}
        />
      );
    }
    return tools;
  }, []);
};
