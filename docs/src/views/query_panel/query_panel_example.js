import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

import QueryPanel from './query_panel';
const queryPanelSource = require('!!raw-loader!./query_panel');
const queryPanelHtml = renderToHtml(QueryPanel);

import QueryPanelExpanded from './query_panel_expanded';
const queryPanelExpandedSource = require('!!raw-loader!./query_panel_expanded');
const queryPanelExpandedHtml = renderToHtml(QueryPanelExpanded);

export default props => (
  <GuidePage title={props.route.name}>
    <EuiCallOut
      title="Design prototype"
      color="warning"
    >
      <p>
        This is a design prototype in the works. It exists to show off flow and animation,
        but still needs work before its ready for use.
      </p>
    </EuiCallOut>

    <EuiSpacer />

    <GuideSection
      title="Pattern: Adding your first filter to a query"
      source={[{
        type: GuideSectionTypes.JS,
        code: queryPanelSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: queryPanelHtml,
      }]}
      text={
        <div>
          <p>
            Simulates adding and removing a single filter to an empty query.
          </p>
          <ol>
            <li>Add a filter by hitting create on the dummy form.</li>
            <li>Modify the filter by clicking it then hitting "Edit filter query" once its created.</li>
            <li>Remove the filter by clicking it, then selecting Delete.</li>
          </ol>
        </div>
      }
      demo={<QueryPanel />}
    />
    <GuideSection
      title="Pattern: What different filter pills might look like"
      source={[{
        type: GuideSectionTypes.JS,
        code: queryPanelExpandedSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: queryPanelExpandedHtml,
      }]}
      text={
        <div>
          <p>
            Here's an example of what a query panel should look like if it has a
            lot of pills with various states on them. Note that once you have more
            than one filter <strong>Add filter</strong> becomes <strong>Manage filters</strong> and
            the menu options change.
          </p>
        </div>
      }
      demo={<QueryPanelExpanded />}
    />
  </GuidePage>
);
