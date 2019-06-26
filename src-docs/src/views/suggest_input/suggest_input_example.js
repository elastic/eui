import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiSuggestInput,
} from '../../../../src/components';

import SuggestInput from './suggest_input';
const suggestInputSource = require('!!raw-loader!./suggest_input');
const suggestInputHtml = renderToHtml(SuggestInput);

export const SuggestInputExample = {
  title: 'SuggestInput',
  sections: [{
    title: 'SuggestInput',
    source: [{
      type: GuideSectionTypes.JS,
      code: suggestInputSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: suggestInputHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiSuggestInput</EuiCode> component.
      </p>
    ),
    props: { EuiSuggestInput },
    demo: <SuggestInput />,
  }],
};
