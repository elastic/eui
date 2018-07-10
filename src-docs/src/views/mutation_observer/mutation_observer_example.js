import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiMutationObserver,
} from '../../../../src/components';

import { MutationObserver } from './mutation_observer';
const mutationObserverSource = require('!!raw-loader!./mutation_observer');
const mutationObserverHtml = renderToHtml(MutationObserver);

export const MutationObserverExample = {
  title: 'MutationObserver',
  sections: [{
    title: 'MutationObserver',
    source: [{
      type: GuideSectionTypes.JS,
      code: mutationObserverSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: mutationObserverHtml,
    }],
    text: (
      <p>
        <EuiCode>MutationObserver</EuiCode> is a wrapper around the Mutation Observer API.
        It takes the same configuration object describing what to watch for and fires the
        callback when that mutation happens.
      </p>
    ),
    components: { EuiMutationObserver },
    demo: <MutationObserver />,
  }],
};
