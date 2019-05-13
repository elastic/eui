import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiLink,
  EuiMutationObserver,
} from '../../../../src/components';

import { MutationObserver } from './mutation_observer';
const mutationObserverSource = require('!!raw-loader!./mutation_observer');
const mutationObserverHtml = renderToHtml(MutationObserver);

export const MutationObserverExample = {
  title: 'MutationObserver',
  sections: [
    {
      title: 'MutationObserver',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: mutationObserverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: mutationObserverHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            <EuiCode>MutationObserver</EuiCode> is a wrapper around the
            <EuiLink href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">
              {' '}
              Mutation Observer API{' '}
            </EuiLink>
            which allows watching for DOM changes to elements and their
            children.
            <EuiCode>MutationObserver</EuiCode> takes the same configuration
            object as the browser API to describe what to watch for, and fires
            the callback when that mutation happens.
          </p>
          <p>
            This is a render prop component, <EuiCode>MutationObserver</EuiCode>{' '}
            will pass a <EuiCode>ref</EuiCode>
            callback which you must put on the element you wish to observe the
            mutations.
          </p>
        </React.Fragment>
      ),
      components: { EuiMutationObserver },
      demo: <MutationObserver />,
    },
  ],
};
