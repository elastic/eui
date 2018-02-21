import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiToggle,
} from '../../../../src/components';

import Toggle from './toggle';
const toggleSource = require('!!raw-loader!./toggle');
const toggleHtml = renderToHtml(Toggle);

export const ToggleExample = {
  title: 'Toggle',
  sections: [{
    title: 'Toggle',
    source: [{
      type: GuideSectionTypes.JS,
      code: toggleSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: toggleHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiToggle</EuiCode> component.
      </p>
    ),
    components: { EuiToggle },
    demo: <Toggle />,
  }],
};
