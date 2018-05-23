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
    source: [{
      type: GuideSectionTypes.JS,
      code: toggleSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: toggleHtml,
    }],
    text: (
      <p>
        The <EuiCode>EuiToggle</EuiCode> component is a very simplified utility for creating
        toggle-able elements. There is only an on/off (checked/unchecked) state. All this creates is
        a visibly hidden input (checkbox or radio) overtop of the children provided.
      </p>
    ),
    components: { EuiToggle },
    demo: <Toggle />,
    props: { EuiToggle },
  }],
};
