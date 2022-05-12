import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiFacetButton,
  EuiFacetGroup,
  EuiCode,
} from '../../../../src/components';

import { facetButtonConfig, facetLayoutConfig } from './playground';

import Facet from './facet';
const facetSource = require('!!raw-loader!./facet');
const facetSnippet = `<EuiFacetButton
  quantity={6}
  icon={<EuiIcon type="dot" color="success" />}
  isSelected>
  <!-- Facet with EuiIcon content -->
</EuiFacetButton>
`;

import FacetLayout from './facet_layout';
const facetLayoutSource = require('!!raw-loader!./facet_layout');
import FacetLayoutHorizontal from './facet_layout_horizontal';
const facetLayoutHorizontalSource = require('!!raw-loader!./facet_layout_horizontal');

export const FacetExample = {
  title: 'Facet',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: facetSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiFacetButtons</strong> are to be used when allowing lists
            with multiple search params to be filtered down by these particular
            params. They allow for an <EuiCode>icon</EuiCode> node and/or{' '}
            <EuiCode>quantity</EuiCode> to be passed. You can also indicate the
            current selection with <EuiCode>isSelected</EuiCode>. Other props
            include <EuiCode>isDisabled</EuiCode> and{' '}
            <EuiCode>isLoading</EuiCode> (which will swap the quantity indicator
            with a loading icon).
          </p>
        </>
      ),
      props: { EuiFacetButton },
      snippet: facetSnippet,
      demo: <Facet />,
      playground: facetButtonConfig,
    },
    {
      title: 'Facet layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: facetLayoutSource,
        },
      ],
      text: (
        <>
          <p>
            Utilize the <strong>EuiFacetGroup</strong> wrapper to correctly
            layout multiple facets. You can supply a <EuiCode>layout</EuiCode>{' '}
            of either <EuiCode>horizontal</EuiCode> or{' '}
            <EuiCode>vertical</EuiCode> with the default being{' '}
            <EuiCode>vertical</EuiCode>. Be sure to contain vertical layouts in
            a skinny component or give it a max-width. You can also adjust the
            spacing between items with the <EuiCode>gutterSize</EuiCode> prop.
          </p>
          <p>
            Typically, each facet grouping should display similarly. For
            example, they should all have icons or be similar icon nodes (like
            avatars). It is up to you whether each group should be single or
            multi-selection.
          </p>
        </>
      ),
      props: { EuiFacetGroup },
      demo: <FacetLayout />,
      snippet: [
        `// Restrict the width of the default (vertical) layout only if not restricted by parent
<EuiFacetGroup style={{ maxWidth: 200 }}>{facets}</EuiFacetGroup>`,
      ],
      playground: facetLayoutConfig,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: facetLayoutHorizontalSource,
        },
      ],
      text: (
        <>
          <h3>Horizontal and large gutter</h3>
        </>
      ),
      props: { EuiFacetGroup },
      demo: <FacetLayoutHorizontal />,
      snippet: [
        '<EuiFacetGroup layout="horizontal" gutterSize="l">{facets}</EuiFacetGroup>',
      ],
    },
  ],
};
