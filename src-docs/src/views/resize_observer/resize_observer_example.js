import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiLink,
  EuiResizeObserver,
} from '../../../../src/components';

import { ResizeObserverExample as ResizeObserver } from './resize_observer';
const resizeObserverSource = require('!!raw-loader!./resize_observer');
const resizeObserverHtml = renderToHtml(ResizeObserver);

export const ResizeObserverExample = {
  title: 'ResizeObserver',
  sections: [
    {
      title: 'ResizeObserver',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: resizeObserverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: resizeObserverHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            <EuiCode>ResizeObserver</EuiCode> is a wrapper around the
            <EuiLink href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">
              {' '}
              Resizer Observer API{' '}
            </EuiLink>
            which allows watching for changes to the content rectangle of DOM
            elements. Unlike <EuiCode>MutationObserver</EuiCode>,{' '}
            <EuiCode>ResizeObserver</EuiCode> does not take parameters, but it
            does fire a more efficient and informative callback when resize
            events occur.
          </p>
          <p>
            This is a render prop component, <EuiCode>ResizeObserver</EuiCode>{' '}
            will pass a <EuiCode>ref</EuiCode>
            callback which you must put on the element you wish to observe.
          </p>
          <p>
            Due to limited browser support (currently supported in Chrome and
            Opera), <EuiCode>EuiResizeObserver</EuiCode> will fallback to using
            the <EuiCode>MutationObserver</EuiCode> API with a default set of
            parameters that approximate the results of{' '}
            <EuiCode>MutationObserver</EuiCode>.
          </p>
        </React.Fragment>
      ),
      components: { EuiResizeObserver },
      demo: <ResizeObserver />,
    },
  ],
};
