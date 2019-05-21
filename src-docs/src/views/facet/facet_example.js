import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiFacetButton, EuiFacetGroup } from '../../../../src/components';

import Facet from './facet';
const facetSource = require('!!raw-loader!./facet');
const facetHtml = renderToHtml(Facet);

import FacetLayout from './facet_layout';
const facetLayoutSource = require('!!raw-loader!./facet_layout');
const facetLayoutHtml = renderToHtml(FacetLayout);

export const FacetExample = {
  title: 'Facet',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: facetSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: facetHtml,
        },
      ],
      text: (
        <p>
          <code>EuiFacetButtons</code> are to be used when allowing lists with
          multiple search params to be filtered down by these particular params.
          They allow for an <code>icon</code> node and/or <code>quantity</code>{' '}
          to be passed. You can also indicate the current selection with{' '}
          <code>isSelected</code>. Other props include <code>isDisabled</code>{' '}
          and <code>isLoading</code> (which will swap the quantity indicator
          with a loading icon).
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
            Typically, each facet grouping should display similarly. For
            example, they should all have icons or be similar icon nodes (like
            avatars). It is up to you whether each group should be single or
            multi-selection.
          </p>
          <p>
            Utilize the <code>EuiFacetGroup</code> wrapper to correctly layout
            multiple facets. You can supply a <code>layout</code> of either{' '}
            <code>horizontal</code> or <code>vertical</code> with the default
            being <code>vertical</code>. Be sure to contain vertical layouts in
            a skinny component or give it a max-width.
          </p>
        </div>
      ),
      props: { EuiFacetGroup },
      demo: <FacetLayout />,
      snippet: `// Restrict the width of default (vertical) if not restricted by parent
<EuiFacetGroup style={{ maxWidth: 200 }}>{facets}</EuiFacetGroup>

// Horizontal
<EuiFacetGroup layout="horizontal">{facets}</EuiFacetGroup>`,
    },
  ],
};
