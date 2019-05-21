import React, { Component, Fragment } from 'react';
import { times } from '../../../../src/services/utils';
import { Random } from '../../../../src/services/random';
import {
  EuiHealth,
  EuiCallOut,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCodeBlock,
  EuiTitle,
  EuiBasicTable,
  EuiSearchBar,
} from '../../../../src/components';

const random = new Random();

const tags = [
  { name: 'marketing', color: 'danger' },
  { name: 'finance', color: 'success' },
  { name: 'eng', color: 'success' },
  { name: 'sales', color: 'warning' },
  { name: 'ga', color: 'success' },
  { name: 'presales', color: 'success' },
  { name: 'product', color: 'warning' },
  { name: 'engineering', color: 'success' },
  { name: 'design', color: 'warning' },
  { name: 'earlybirds', color: 'success' },
  { name: 'people-ops', color: 'danger' },
  { name: 'solutions', color: 'success' },
  { name: 'elasticsearch', color: 'success' },
  { name: 'kibana', color: 'success' },
  { name: 'cloud', color: 'danger' },
  { name: 'logstash', color: 'warning' },
  { name: 'beats', color: 'warning' },
  { name: 'legal', color: 'danger' },
  { name: 'revenue', color: 'success' },
  { name: 'public-relations', color: 'success' },
  { name: 'social-media-management', color: 'warning' },
];

const types = ['dashboard', 'visualization', 'watch'];

const users = ['dewey', 'wanda', 'carrie', 'jmack', 'gabic'];

const items = times(10, id => {
  return {
    id,
    status: random.oneOf(['open', 'closed']),
    type: random.oneOf(types),
    tag: random.setOf(tags.map(tag => tag.name), { min: 0, max: 3 }),
    active: random.boolean(),
    owner: random.oneOf(users),
    followers: random.integer({ min: 0, max: 20 }),
    comments: random.integer({ min: 0, max: 10 }),
    stars: random.integer({ min: 0, max: 5 }),
  };
});

const initialQuery = EuiSearchBar.Query.MATCH_ALL;

export class SearchBarFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: initialQuery,
      result: items,
      error: null,
    };
  }

  onChange = ({ query, error }) => {
    if (error) {
      this.setState({ error });
    } else {
      this.setState({
        error: null,
        result: EuiSearchBar.Query.execute(query, items, {
          defaultFields: ['owner', 'tag', 'type'],
        }),
        query,
      });
    }
  };

  renderSearch() {
    const filters = [
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag ("prefix" filter, default)',
        multiSelect: 'or',
        options: tags.map(tag => ({
          value: tag.name,
          view: <EuiHealth color={tag.color}>{tag.name}</EuiHealth>,
        })),
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag ("includes" filter)',
        filterWith: 'includes',
        multiSelect: 'or',
        options: tags.map(tag => ({
          value: tag.name,
          view: <EuiHealth color={tag.color}>{tag.name}</EuiHealth>,
        })),
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag (custom filter)',
        filterWith: () => Math.random() > 0.5,
        multiSelect: 'or',
        options: tags.map(tag => ({
          value: tag.name,
          view: <EuiHealth color={tag.color}>{tag.name}</EuiHealth>,
        })),
      },
    ];

    const schema = {
      strict: true,
      fields: {
        active: {
          type: 'boolean',
        },
        status: {
          type: 'string',
        },
        followers: {
          type: 'number',
        },
        comments: {
          type: 'number',
        },
        stars: {
          type: 'number',
        },
        created: {
          type: 'date',
        },
        owner: {
          type: 'string',
        },
        tag: {
          type: 'string',
          validate: value => {
            if (!tags.some(tag => tag.name === value)) {
              throw new Error(
                `unknown tag (possible values: ${tags
                  .map(tag => tag.name)
                  .join(',')})`
              );
            }
          },
        },
      },
    };

    return (
      <EuiSearchBar
        defaultQuery={initialQuery}
        box={{
          placeholder: 'e.g. type:visualization -is:active joe',
          incremental: true,
          schema,
        }}
        filters={filters}
        onChange={this.onChange}
      />
    );
  }

  renderError() {
    const { error } = this.state;
    if (!error) {
      return;
    }
    return (
      <Fragment>
        <EuiCallOut
          iconType="faceSad"
          color="danger"
          title={`Invalid search: ${error.message}`}
        />
        <EuiSpacer size="l" />
      </Fragment>
    );
  }

  renderTable() {
    const columns = [
      {
        name: 'Type',
        field: 'type',
      },
      {
        name: 'Open',
        field: 'status',
        render: status => (status === 'open' ? 'Yes' : 'No'),
      },
      {
        name: 'Active',
        field: 'active',
        dataType: 'boolean',
      },
      {
        name: 'Tags',
        field: 'tag',
      },
      {
        name: 'Owner',
        field: 'owner',
      },
      {
        name: 'Stats',
        width: '150px',
        render: item => {
          return (
            <div>
              <div>{`${item.stars} Stars`}</div>
              <div>{`${item.followers} Followers`}</div>
              <div>{`${item.comments} Comments`}</div>
            </div>
          );
        },
      },
    ];

    const queriedItems = EuiSearchBar.Query.execute(this.state.query, items, {
      defaultFields: ['owner', 'tag', 'type'],
    });

    return <EuiBasicTable items={queriedItems} columns={columns} />;
  }

  render() {
    const { query } = this.state;

    const esQueryDsl = EuiSearchBar.Query.toESQuery(query);
    const esQueryString = EuiSearchBar.Query.toESQueryString(query);

    const content = this.renderError() || (
      <EuiFlexGroup>
        <EuiFlexItem grow={4}>
          <EuiTitle size="s">
            <h3>Elasticsearch Query String</h3>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiCodeBlock language="js">
            {esQueryString ? esQueryString : ''}
          </EuiCodeBlock>

          <EuiSpacer size="l" />

          <EuiTitle size="s">
            <h3>Elasticsearch Query DSL</h3>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiCodeBlock language="js">
            {esQueryDsl ? JSON.stringify(esQueryDsl, null, 2) : ''}
          </EuiCodeBlock>
        </EuiFlexItem>

        <EuiFlexItem grow={6}>
          <EuiTitle size="s">
            <h3>JS execution</h3>
          </EuiTitle>

          <EuiSpacer size="s" />

          {this.renderTable()}
        </EuiFlexItem>
      </EuiFlexGroup>
    );

    return (
      <Fragment>
        {this.renderSearch()}
        <EuiSpacer size="l" />
        {content}
      </Fragment>
    );
  }
}
