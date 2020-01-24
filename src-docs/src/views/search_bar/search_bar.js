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
  EuiSwitch,
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

const loadTags = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        tags.map(tag => ({
          value: tag.name,
          view: <EuiHealth color={tag.color}>{tag.name}</EuiHealth>,
        }))
      );
    }, 2000);
  });
};

const initialQuery = EuiSearchBar.Query.MATCH_ALL;

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: initialQuery,
      result: items,
      error: null,
      incremental: false,
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

  toggleIncremental = () => {
    this.setState(prevState => ({ incremental: !prevState.incremental }));
  };

  renderSearch() {
    const { incremental } = this.state;

    const filters = [
      {
        type: 'field_value_toggle_group',
        field: 'status',
        items: [
          {
            value: 'open',
            name: 'Open',
          },
          {
            value: 'closed',
            name: 'Closed',
          },
        ],
      },
      {
        type: 'is',
        field: 'active',
        name: 'Active',
        negatedName: 'Inactive',
      },
      {
        type: 'field_value_toggle',
        name: 'Mine',
        field: 'owner',
        value: 'dewey',
      },
      {
        type: 'field_value_toggle',
        name: 'Popular',
        field: 'followers',
        value: 5,
        operator: 'gt',
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        multiSelect: 'or',
        cache: 10000, // will cache the loaded tags for 10 sec
        options: () => loadTags(),
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
            if (value !== '' && !tags.some(tag => tag.name === value)) {
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
          incremental,
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
    const { incremental, query } = this.state;

    let esQueryDsl;
    let esQueryString;

    try {
      esQueryDsl = EuiSearchBar.Query.toESQuery(query);
    } catch (e) {
      esQueryDsl = e.toString();
    }
    try {
      esQueryString = EuiSearchBar.Query.toESQueryString(query);
    } catch (e) {
      esQueryString = e.toString();
    }

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
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem>{this.renderSearch()}</EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Incremental"
              checked={incremental}
              onChange={this.toggleIncremental}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="l" />
        {content}
      </Fragment>
    );
  }
}
