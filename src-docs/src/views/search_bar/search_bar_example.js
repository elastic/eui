import React from 'react';

import { renderToHtml } from '../../services';
import { propsInfo } from './props_info';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import { SearchBar } from './search_bar';

const searchBarSource = require('!!raw-loader!./search_bar');
const searchBarHtml = renderToHtml(SearchBar);

export const SearchBarExample = {
  title: 'Search Bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: searchBarSource,
        }, {
          type: GuideSectionTypes.HTML,
          code: searchBarHtml,
        }
      ],
      text: (
        <div>
          <p>
            A <EuiCode>EuiSearchBar</EuiCode> is a toolbar that enables the user to create/define a search query.
            This can be done either by entering the query syntax in a search box or by clicking any of the configured
            filters. The query language is not meant to be full blown search language for arbitrary data (e.g.
            as required in the Discover App in Kibana), yet it does provide some useful features:
          </p>
          <ul>
            <li>
              Search <EuiCode>terms</EuiCode> - one can simply type search terms (free text words) - Example,
              <EuiCode>website -production</EuiCode>. In this example the intention is to find all items that has the
              &quot;website&quot; terms in them but do not have the word &quot;production&quot;
            </li>
            <li>
              Field/value search - one can search for terms within specific fields - Example,
              <EuiCode>tag:bug -severity:high</EuiCode>. In this example the intention is to find all items that has
              &quot;bug&quot; in their <EuiCode>tag</EuiCode> field but do not have &quot;high&quot; in their
              <EuiCode>severity</EuiCode> field. It is also possible to define range queries on numeric and date fields.
              For example, <EuiCode>followers&gt;=10</EuiCode> will only match items that have 10 follower or above. And
              <EuiCode>created&gt;&#39;12 Jan 2018&#39;</EuiCode> will only match items that were created after 12th
              January 2018.
            </li>
            <li>
              <EuiCode>is</EuiCode> clauses - a simple boolean filter over a flag - Example,
              <EuiCode>is:open -is:assigned</EuiCode>. In this example the intention is to find all items that are
              flagged as <EuiCode>open</EuiCode> but are not flagged as <EuiCode>assigned</EuiCode>
            </li>
          </ul>
          <p>
            While the user can use the syntax described above to enter queries in the search box, it is possible
            provide the user help with the syntax using filters. The filters are UI controls that can manipulate
            the query. The available filters are:
          </p>
          <ul>
            <li>
              <EuiCode>field_value_selection</EuiCode> - A filter to manipulate field/value clauses. The filter is
              associated with a field name, and provides the user a list of value options to choose from. This
              filter can be configured to be single or multi select. In a single select mode, only one field filter
              will be added and replaced when the user changes the selection. In multi-select mode, a new filter
              will be added for each of value selection. It is the intention for all these field clauses  to be ANDed.
            </li>
            <li>
              <EuiCode>field_value_toggle</EuiCode> - A filter to manipulate a single field/value clause. The filter is
              associated with a field name and a value. When the user clicks the control (button) the field/value filter
              is added/removed to/from the query.
            </li>
            <li>
              <EuiCode>field_value_toggle_group</EuiCode> - Similar to the <EuiCode>field_value_toggle</EuiCode> above,
              except here you can define multiple values they will be displayed as a group of toggle buttons.
            </li>
            <li>
              <EuiCode>is</EuiCode> - A toggle button that is associated with a flag name and when clicked it toggles
              this flag back and forth (adds/removed an <EuiCode>is:</EuiCode> clause to/from the query).
            </li>
          </ul>
        </div>
      ),
      props: propsInfo,
      demo: <SearchBar/>
    }
  ],
};
