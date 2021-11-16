import React from 'react';
import { Link } from 'react-router-dom';

import {
  GuideRule,
  GuideRuleExample,
  GuideSectionTypes,
} from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiPanel,
  EuiImage,
  EuiHorizontalRule,
  EuiBasicTable,
  EuiLink,
  EuiCode,
} from '../../../../src/components';

import animatedGif from '../../images/pagination_filters.gif';
import userControlDo from '../../images/pagination_options_do.svg';
import userControlDont from '../../images/pagination_options_dont.svg';
import infiniteDo from '../../images/pagination_infinite_do.svg';
import infiniteDont from '../../images/pagination_infinite_dont.svg';

import Table from './paginated_table';
import { GuideSection } from '../../components/guide_section/guide_section';
const source = require('!!raw-loader!./paginated_table');

export default () => (
  <>
    <EuiText grow={false}>
      <h2>
        Don’t rely on pagination for users to find what they’re looking for
      </h2>
      <p>
        For any results-style table, always provide ways to filter, search, etc
        for the thing that the user wants. Pagination is only helpful once the
        user has reduced the 1000+ results to just 100 (for example).
      </p>
    </EuiText>

    <EuiSpacer />

    <EuiPanel
      color="subdued"
      paddingSize="l"
      hasShadow={false}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <EuiImage
        alt="Using search, filters and pagination together"
        url={animatedGif}
        size="xl"
      />
      <EuiSpacer />
      <EuiLink href="https://www.figma.com/proto/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?page-id=15025%3A1&node-id=22522%3A276909&viewport=323%2C48%2C0.35&scaling=min-zoom&starting-point-node-id=22522%3A276461">
        Figma
      </EuiLink>
    </EuiPanel>

    <EuiSpacer size="xxl" />

    <EuiText grow={false}>
      <h2>Don’t rely on pagination to indicate total results</h2>
      <p>
        When possible, always present a clear indicator of how many (and if not
        all results) have been returned. Just a simple count will do. Including
        a detailed summary of results at the top of the table or list goes a
        long way to signify what paging can’t.
      </p>
      <h3>Indicate indeterminate results</h3>
      <p>
        If you cannot provide a concrete number of results, you still have to
        communicate what the current results showcase. For instance, say
        &quot;Showing first 100 results&quot; or &quot;Search results maxed at
        1000&quot; or &quot;Results fetched at runtime&quot;.
      </p>
      <p>
        <em>
          Remember that not all users understand how your data API works. They
          just care about the data that&apos;s being shown to them.
        </em>
      </p>
    </EuiText>

    <EuiSpacer size="xl" />

    <EuiHorizontalRule />

    <EuiSpacer size="l" />

    <EuiText grow={false}>
      <h2>Give users control of pagination</h2>
      <p>
        Providing a{' '}
        <Link to="/navigation/pagination#customizable-pagination">
          “Rows per page” option
        </Link>{' '}
        is often helpful enough to provide users control over the amount of data
        they see at once.
      </p>
    </EuiText>

    <GuideRule>
      <GuideRuleExample
        type="do"
        text="For shorter sets of data, you may want to include an “Show all” option."
        panelProps={{ paddingSize: 'l' }}
      >
        <EuiImage alt="Provide a Show all" url={userControlDo} />
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Overload the user with choices, stick to only 2-3 options."
        panelProps={{ paddingSize: 'l' }}
      >
        <EuiImage alt="Too many rows per page choices" url={userControlDont} />
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer size="xxl" />

    <EuiText grow={false}>
      <h3>Optimize your defaults</h3>
      <p>
        Most users don’t customize the default view. Therefore, it’s vital that
        you provide optimal defaults and reduce complexity as the number of
        entries increase. This means choosing a default “Rows per page” that
        best corresponds to the total results. For instance, 1000+ results
        shouldn’t start with 10 rows per page, but rather 25 or 50.
      </p>
      <p>
        Here are some <strong>samples</strong> of what controls to provide based
        on the number of data entries.
      </p>
    </EuiText>

    <EuiSpacer size="l" />

    <EuiBasicTable
      columns={[
        {
          field: 'entries',
          name: 'Total entries',
          valign: 'top',
        },
        {
          field: 'rows',
          name: 'Rows per page options',
          render: (rows) => rows,
          valign: 'top',
        },
        {
          field: 'style',
          name: 'Pagination style',
          render: (style) => style,
          valign: 'top',
        },
      ]}
      items={[
        {
          entries: '0',
          rows: (
            <span>
              Use{' '}
              <Link to="/display/empty-prompt">
                <strong>EuiEmptyPrompt</strong>
              </Link>{' '}
              in place of table
            </span>
          ),
          style: 'N/A',
        },
        {
          entries: 'Less than 50',
          rows: 'Show 10, but allow All',
          style: <Link to="/navigation/pagination#few-pages">Numbered</Link>,
        },
        {
          entries: '51 - 100',
          rows: '10, 20, All',
          style: (
            <Link to="/navigation/pagination#basic-usage-with-many-pages">
              Numbered
            </Link>
          ),
        },
        {
          entries: '101 - 200',
          rows: '10, 20, 50',
          style: (
            <span>
              <Link to="/navigation/pagination#basic-usage-with-many-pages">
                Numbered
              </Link>{' '}
              or{' '}
              <Link to="/navigation/pagination#compressed-display">
                Compressed
              </Link>
            </span>
          ),
        },
        {
          entries: 'More than 200',
          rows: '25, 50, 100',
          style: (
            <span>
              <Link to="/navigation/pagination#basic-usage-with-many-pages">
                Numbered
              </Link>{' '}
              or{' '}
              <Link to="/navigation/pagination#indeterminate-page-count">
                Indeterminate
              </Link>
            </span>
          ),
        },
        {
          entries: 'Unknown',
          rows: (
            <span>
              Depends on what you <em>expect</em> the total entries to be
            </span>
          ),
          style: (
            <Link to="/navigation/pagination#indeterminate-page-count">
              Indeterminate
            </Link>
          ),
        },
      ]}
    />

    <EuiSpacer size="l" />

    <EuiText grow={false}>
      <p>
        If the total results are unknown, you can make a best guess based on the
        context of that specific table, whether there’s{' '}
        <strong>most likely</strong> going to be tens or thousands of results.
        From there you can decide to show 10 rows per page or 25 by default.
      </p>
      <p>
        <strong>
          The complexity of the data will also contribute to this equation,
          which is why the table above is just a sample.
        </strong>
      </p>
    </EuiText>

    <EuiSpacer size="xl" />

    <EuiHorizontalRule />

    <EuiSpacer size="l" />

    <EuiText grow={false}>
      <h2>Preserve the user-customized state of pagination</h2>
      <p>
        When providing pagination, customizable display options, and data
        filters, always save the user’s state in some form. This is especially
        important if your data includes links that navigate a user away from the
        current view. There’s nothing more frustrating for users than going back
        to find their filters and pagination have been reset.
      </p>
      <p>
        Below is a working example that utilizes <EuiCode>localStorage</EuiCode>{' '}
        to save the table’s state.
      </p>
    </EuiText>

    <EuiSpacer size="l" />

    <GuideSection
      demo={<Table />}
      source={[
        {
          type: GuideSectionTypes.JS,
          code: source,
        },
      ]}
    />

    <EuiSpacer size="l" />

    <GuideRule
      heading="Don’t use infinite scrolling"
      description="Infinite scrolling, i.e. loading data as the user scrolls, is the exact
                    opposite of being able to save the user’s pagination state. As soon as
                    they navigate away from the page, their position in the list is lost.
                    It’s better to increase the quantities of rows per page or provide a
                    “Load more” action."
    >
      <GuideRuleExample
        type="do"
        text="Provide a direct action for users to initiate the loading of more data. "
        panelProps={{ paddingSize: 'none' }}
      >
        <EuiImage alt="Provide a Show all" url={infiniteDo} />
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Use infinite scroll to automatically load more rows of data."
        panelProps={{ paddingSize: 'none' }}
      >
        <EuiImage alt="Too many rows per page choices" url={infiniteDont} />
      </GuideRuleExample>
    </GuideRule>
  </>
);
