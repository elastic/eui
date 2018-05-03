import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import UtilityClasses from './utility_classes';
const utilityClassesSource = require('!!raw-loader!./utility_classes');
const utilityClassesHtml = renderToHtml(UtilityClasses);

export const UtilityClassesExample = {
  title: 'UtilityClasses',
  sections: [{
    title: 'UtilityClasses',
    source: [{
      type: GuideSectionTypes.JS,
      code: utilityClassesSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: utilityClassesHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiUtilityClasses</EuiCode> component.
      </p>
    ),
    demo: <UtilityClasses />,
  }],
};
