import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import QueryPanel from './query_panel';
const queryPanelSource = require('!!raw-loader!./query_panel');
const queryPanelHtml = renderToHtml(QueryPanel);

import QueryPanelExpanded from './query_panel_expanded';
const queryPanelExpandedSource = require('!!raw-loader!./query_panel_expanded');
const queryPanelExpandedHtml = renderToHtml(QueryPanelExpanded);

import QueryFiltersOnly from './query_filters_only';
const queryFiltersOnlySource = require('!!raw-loader!./query_filters_only');
const queryFiltersOnlyHtml = renderToHtml(QueryFiltersOnly);

export const QueryPanelExample = {
  title: 'Query Panel',
  sections: [{
    title: 'Pattern: Adding your first filter to a query',
    source: [{
      type: GuideSectionTypes.JS,
      code: queryPanelSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: queryPanelHtml,
    }],
    text: (
      <div>
        <p>
          Simulates adding and removing a single filter to an empty query.
        </p>
        <ol>
          <li>Add a filter by hitting create on the dummy form.</li>
          <li>Modify the filter by clicking it then hitting <strong>Edit filter query</strong> once it is created.</li>
          <li>Remove the filter by clicking it, then selecting Delete.</li>
        </ol>
      </div>
    ),
    demo: <QueryPanel />,
  }, {
    title: 'Pattern: What different filter pills might look like',
    source: [{
      type: GuideSectionTypes.JS,
      code: queryPanelExpandedSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: queryPanelExpandedHtml,
    }],
    text: (
      <div>
        <p>
          Here is an example of what a query panel should look like if it has a
          lot of pills with various states on them. Note that once you have more
          than one filter <strong>Add filter</strong> becomes <strong>Manage filters</strong> and
          the menu options change.
        </p>
      </div>
    ),
    demo: <QueryPanelExpanded />,
  }, {
    title: 'Filters only',
    source: [{
      type: GuideSectionTypes.JS,
      code: queryFiltersOnlySource,
    }, {
      type: GuideSectionTypes.HTML,
      code: queryFiltersOnlyHtml,
    }],
    text: (
      <div>
        <p>
          Sometimes you want a search mechanism that is not freeform and only allows
          more structured, hand-held searching. In those cases, simply
          remove the freeform search component bar and the filter bar will correctly
          style itself.
        </p>
      </div>
    ),
    demo: <QueryFiltersOnly />,
  }],
};
