import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiLink } from '../../../../src/components';

import { ResizeObserverExample as ResizeObserver } from './resize_observer';
const resizeObserverSource = require('!!raw-loader!./resize_observer');
const resizeObserverHtml = renderToHtml(ResizeObserver);

import { ResizeObserverHookExample as ResizeObserverHook } from './resize_observer_hook';
const resizeObserverHookSource = require('!!raw-loader!./resize_observer_hook');
const resizeObserverHookHtml = renderToHtml(ResizeObserverHook);

export const ResizeObserverExample = {
  title: 'Resize observer',
  sections: [
    {
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
            <strong>EuiResizeObserver</strong> is a wrapper around the
            <EuiLink href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">
              {' '}
              Resizer Observer API{' '}
            </EuiLink>
            which allows watching for changes to the content rectangle of DOM
            elements. Unlike{' '}
            <Link to="/utilities/mutation-observer">
              <strong>EuiMutationObserver</strong>
            </Link>
            , <strong>EuiResizeObserver</strong> does not take parameters, but
            it does fire a more efficient and informative callback when resize
            events occur.
          </p>
          <p>
            This is a render prop component, <strong>EuiResizeObserver</strong>{' '}
            will pass a <EuiCode>ref</EuiCode>
            callback which you must put on the element you wish to observe.
          </p>
        </React.Fragment>
      ),
      demo: <ResizeObserver />,
    },
    {
      title: 'useResizeObserver hook',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: resizeObserverHookSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: resizeObserverHookHtml,
        },
      ],
      text: (
        <React.Fragment>
          <p>
            There is also a React hook, <EuiCode>useResizeObserver</EuiCode>,
            which provides the same observation functionality.
          </p>
        </React.Fragment>
      ),
      demo: <ResizeObserverHook />,
    },
  ],
};
