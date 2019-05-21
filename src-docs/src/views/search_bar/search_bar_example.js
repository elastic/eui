import React from 'react';

import { renderToHtml } from '../../services';
import { propsInfo } from './props_info';

import { GuideRuleTitle, GuideSectionTypes } from '../../components';

import { EuiCode, EuiLink } from '../../../../src/components';

import { SearchBar } from './search_bar';
import { ControlledSearchBar } from './controlled_search_bar';
import { SearchBarFilters } from './search_bar_filters';

const searchBarSource = require('!!raw-loader!./search_bar');
const searchBarHtml = renderToHtml(SearchBar);

const controlledSearchBarSource = require('!!raw-loader!./controlled_search_bar');
const controlledSearchBarHtml = renderToHtml(ControlledSearchBar);

const searchBarFiltersSource = require('!!raw-loader!./search_bar_filters');
const searchBarFiltersHtml = renderToHtml(SearchBarFilters);

export const SearchBarExample = {
  title: 'Search Bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: searchBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: searchBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            A <EuiCode>EuiSearchBar</EuiCode> is a toolbar that enables the user
            to create/define a search query. This can be done either by entering
            the query syntax in a search box or by clicking any of the
            configured filters. The query language is not meant to be full blown
            search language for arbitrary data (e.g. as required in the Discover
            App in Kibana), yet it does provide some useful features:
          </p>
          <ul>
            <li>
              Search <EuiCode>terms</EuiCode> - one can simply type search terms
              (free text words) - Example,
              <EuiCode>website -production</EuiCode>. In this example the
              intention is to find all items that have the &quot;website&quot;
              terms in them but do not have the word &quot;production&quot;
            </li>
            <li>
              Field/value search - one can search for terms within specific
              fields - Example,
              <EuiCode>tag:bug -severity:high</EuiCode>. In this example the
              intention is to find all items that have &quot;bug&quot; in their{' '}
              <EuiCode>tag</EuiCode> field but do not have &quot;high&quot; in
              their
              <EuiCode>severity</EuiCode> field. It is also possible to define
              range queries on numeric and date fields. For example,{' '}
              <EuiCode>followers&gt;=10</EuiCode> will only match items that
              have 10 followers or above. And
              <EuiCode>created&gt;&#39;12 Jan 2018&#39;</EuiCode> will only
              match items that were created after 12th January 2018.
            </li>
            <li>
              <EuiCode>is</EuiCode> clauses - a simple boolean filter over a
              flag - Example,
              <EuiCode>is:open -is:assigned</EuiCode>. In this example the
              intention is to find all items that are flagged as{' '}
              <EuiCode>open</EuiCode> but are not flagged as{' '}
              <EuiCode>assigned</EuiCode>
            </li>
            <li>
              <EuiCode>or group</EuiCode> clauses - allowing multiple clauses to
              be OR&apos;d together - Example,
              <EuiCode>(is:active OR owner:dewey) followers&gt;5</EuiCode>. In
              this example the intention is to find all items that are
              <EuiCode>active</EuiCode> OR owned by <EuiCode>dewey</EuiCode>,
              and have more than 5 <EuiCode>followers</EuiCode>
            </li>
            <li>
              Operators for partial text match <EuiCode>:</EuiCode>, exact text
              match <EuiCode>=</EuiCode>, greater than <EuiCode>&gt;</EuiCode>,
              greater than or equal <EuiCode>&gt;=</EuiCode>, less than{' '}
              <EuiCode>&lt;</EuiCode>, and less than or equal{' '}
              <EuiCode>&lt;=</EuiCode>.
            </li>
          </ul>
          <p>
            While the user can use the syntax described above to enter queries
            in the search box, it is possible to provide the user help with the
            syntax using filters. The filters are UI controls that can
            manipulate the query. The available filters are:
          </p>
          <ul>
            <li>
              <EuiCode>field_value_selection</EuiCode> - A filter to manipulate
              field/value clauses. The filter is associated with a field name,
              and provides the user a list of value options to choose from. This
              filter can be configured to be single or multi select. In a single
              select mode, only one field filter will be added and replaced when
              the user changes the selection. In multi-select mode, a new filter
              will be added for each value selection. It is the intention for
              all these field clauses to be ANDed.
            </li>
            <li>
              <EuiCode>field_value_toggle</EuiCode> - A filter to manipulate a
              single field/value clause. The filter is associated with a field
              name and a value. When the user clicks the control (button) the
              field/value filter is added/removed to/from the query.
            </li>
            <li>
              <EuiCode>field_value_toggle_group</EuiCode> - Similar to the{' '}
              <EuiCode>field_value_toggle</EuiCode> above, except here you can
              define multiple values that will be displayed as a group of toggle
              buttons.
            </li>
            <li>
              <EuiCode>is</EuiCode> - A toggle button that is associated with a
              flag name and when clicked it toggles this flag back and forth
              (adds/removed an <EuiCode>is:</EuiCode> clause to/from the query).
            </li>
          </ul>

          <GuideRuleTitle>Date parsing</GuideRuleTitle>
          <p>
            Date values can be used for equality or range tests when the{' '}
            <EuiCode>schema</EuiCode> prop specifies the field as a{' '}
            <EuiCode>date</EuiCode> type (the <EuiCode>created</EuiCode> field
            in the demo below is a date), and must be enclosed in single quotes.
            E.g.&nbsp;
            <EuiCode>created:&apos;2019-01-01&apos;</EuiCode>,&nbsp;
            <EuiCode>created&gt;=&apos;3rd January 2017&apos;</EuiCode>
          </p>
          <div>
            Formats understood by the parser
            <ul>
              <li>
                relative
                <ul>
                  <li>
                    <EuiCode>yesterday</EuiCode>
                  </li>
                  <li>
                    <EuiCode>today</EuiCode>
                  </li>
                  <li>
                    <EuiCode>tomorrow</EuiCode>
                  </li>
                </ul>
              </li>
              <li>
                absolute (parsed by Moment.js&apos;s&nbsp;
                <EuiLink
                  href="https://momentjs.com/docs/#/parsing/utc/"
                  target="_blank">
                  `utc` method
                </EuiLink>
                )
                <ul>
                  <li>
                    <EuiCode>ddd</EuiCode>
                  </li>
                  <li>
                    <EuiCode>dddd</EuiCode>
                  </li>
                  <li>
                    <EuiCode>D MMM YY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>Do MMM YY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>D MMM YYYY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>Do MMM YYYY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>DD MMM YY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>DD MMM YYYY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>D MMMM YY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>Do MMMM YY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>D MMMM YYYY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>Do MMMM YYYY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>DD MMMM YY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>DD MMMM YYYY</EuiCode>
                  </li>
                  <li>
                    <EuiCode>YYYY-MM-DD</EuiCode>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      ),
      props: propsInfo,
      demo: <SearchBar />,
    },
    {
      title: 'Controlled Search Bar',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlledSearchBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlledSearchBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            A <EuiCode>EuiSearchBar</EuiCode> can have its query controlled by a
            parent component by passing the <EuiCode>query</EuiCode> prop.
            Changes to the query will be passed back up through the{' '}
            <EuiCode>onChange</EuiCode> callback where the new query must be
            stored in state and passed back into the search bar.
          </p>
        </div>
      ),
      demo: <ControlledSearchBar />,
    },
    {
      title: 'Search Bar Filters',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: searchBarFiltersSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: searchBarFiltersHtml,
        },
      ],
      text: (
        <div>
          <p>
            A <EuiCode>EuiSearchBar</EuiCode> can have custom filter dropdowns
            that control how a user can search.
          </p>
        </div>
      ),
      demo: <SearchBarFilters />,
    },
  ],
};
