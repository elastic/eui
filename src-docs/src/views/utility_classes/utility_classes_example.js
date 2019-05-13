import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import UtilityClasses from './utility_classes';
const utilityClassesSource = require('!!raw-loader!./utility_classes');
const utilityClassesHtml = renderToHtml(UtilityClasses);

export const UtilityClassesExample = {
  title: 'CSS utility classes',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: utilityClassesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: utilityClassesHtml,
        },
      ],
      text: (
        <p>
          The following CSS-only classes are provided as helper utilities. They
          are useful for making micro-adjustments to existing React components.
        </p>
      ),
      demo: <UtilityClasses />,
    },
  ],
};
