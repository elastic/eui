import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiFacetButton,
} from '../../../../src/components';

import Facet from './facet';
const facetSource = require('!!raw-loader!./facet');
const facetHtml = renderToHtml(Facet);

import FacetLayout from './facet_layout';
const facetLayoutSource = require('!!raw-loader!./facet_layout');
const facetLayoutHtml = renderToHtml(FacetLayout);

export const FacetExample = {
  title: 'Facet',
  sections: [{
    title: 'Facet',
    source: [{
      type: GuideSectionTypes.JS,
      code: facetSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: facetHtml,
    }],
    text: (
      <p>
      Facet buttons are to be used when allowing lists with multiple search params to be
      filtered down by these particular params. They allow for an <code>icon</code> node
      and/or <code>quantity</code> to be passed. You can also indicate the current selection
      with <code>isSelected</code>. Other props include <code>isDisabled</code>{' '}
      and <code>isLoading</code> (which will swap the quantity indicator with a loading icon).
      </p>
    ),
    props: { EuiFacetButton },
    demo: <Facet />,
  },
  {
    title: 'Facet layout',
    source: [
      {
        type: GuideSectionTypes.JS,
        code: facetLayoutSource,
      },
      {
        type: GuideSectionTypes.HTML,
        code: facetLayoutHtml,
      },
    ],
    text: (
      <div>
        <p>
          On their own, these buttons are inline-block elements which work well in horizontal
          applications. However, to get the layout you see below, wrap the group of buttons
          in a{' '}
          <code>
            &lt;EuiFlexGroup direction=&quot;column&quot; gutterSize=&quot;none&quot; /&gt;
          </code>. There is no need to wrap individual buttons in an <code>EuiFlexItem</code>.
        </p>
      </div>
    ),
    demo: <FacetLayout />,
  }, ],
};
