import React from 'react';
import { GuideSectionTypes } from '../../components';

import DragAndDropCustomHandle from './drag_and_drop_custom_handle';
const dragAndDropCustomHandleSource = require('!!raw-loader!./drag_and_drop_custom_handle');

export const DragAndDropExample = {
  title: 'Drag and drop',
  beta: true,
  sections: [
    {
      title: 'Custom drag handle',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dragAndDropCustomHandleSource,
        },
      ],
      demo: <DragAndDropCustomHandle />,
    },
  ],
};
