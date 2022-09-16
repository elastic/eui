import React, { useState, Fragment } from 'react';
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
  EuiFilterButton,
  EuiPopover,
  EuiButton,
  EuiPanel,
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

const items = times(10, (id) => {
  return {
    id,
    status: random.oneOf(['open', 'closed']),
    type: random.oneOf(types),
    tag: random.setOf(
      tags.map((tag) => tag.name),
      { min: 0, max: 3 }
    ),
    active: random.boolean(),
    owner: random.oneOf(users),
    followers: random.integer({ min: 0, max: 20 }),
    comments: random.integer({ min: 0, max: 10 }),
    stars: random.integer({ min: 0, max: 5 }),
  };
});

const initialQuery = EuiSearchBar.Query.MATCH_ALL;

const CustomComponent = ({ query, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const orTagsClause = query.getOrFieldClause('tag');
  const selectedTags = orTagsClause?.value ?? [];
  const isOnlySales =
    !!(selectedTags.length === 1 && selectedTags[0] === 'sales') &&
    !hasCloudExcluded;

  const simpleTagClause = query.getSimpleFieldClause('tag');
  const hasCloudExcluded = !!(
    simpleTagClause &&
    simpleTagClause.match === 'must_not' &&
    simpleTagClause.operator === 'eq'
  );

  const hasFiltersApplied = query.hasClauses();

  const closePopover = () => {
    setIsOpen(false);
  };

  const button = (
    <EuiFilterButton
      iconType="arrowDown"
      iconSide="right"
      onClick={() => setIsOpen((prev) => !prev)}
      hasActiveFilters={isOnlySales}
      numActiveFilters={isOnlySales ? 1 : undefined}
      grow
    >
      Custom
    </EuiFilterButton>
  );

  return (
    <EuiPopover
      button={button}
      isOpen={isOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downCenter"
    >
      <EuiPanel paddingSize="m">
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiButton
              onClick={() => {
                const q = query
                  .removeSimpleFieldValue('tag', 'cloud')
                  .removeOrFieldClauses('tag')
                  .addOrFieldValue('tag', 'sales', true, 'eq');
                onChange(q);
                closePopover();
              }}
              disabled={isOnlySales}
            >
              Only sales
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton
              onClick={() => {
                const q = query.addSimpleFieldValue(
                  'tag',
                  'cloud',
                  false,
                  'eq'
                );
                onChange(q);
                closePopover();
              }}
              disabled={hasCloudExcluded}
            >
              Exclude cloud
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton
              onClick={() => {
                const q = query.removeAllClauses();
                onChange(q);
                closePopover();
              }}
              disabled={!hasFiltersApplied}
            >
              All
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </EuiPopover>
  );
};

export const SearchBarFilters = () => {
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState(null);

  const onChange = ({ query, error }) => {
    if (error) {
      setError(error);
    } else {
      setError(null);
      setQuery(query);
    }
  };

  const renderSearch = () => {
    const filters = [
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag ("prefix" filter, default)',
        multiSelect: 'or',
        options: tags.map((tag) => ({
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
        options: tags.map((tag) => ({
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
        options: tags.map((tag) => ({
          value: tag.name,
          view: <EuiHealth color={tag.color}>{tag.name}</EuiHealth>,
        })),
      },
      {
        type: 'custom_component',
        component: CustomComponent,
      },
    ];

    const schema = {
      strict: true,
      fields: {
        type: {
          type: 'string',
        },
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
          validate: (value) => {
            if (!tags.some((tag) => tag.name === value)) {
              throw new Error(
                `unknown tag (possible values: ${tags
                  .map((tag) => tag.name)
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
          placeholder: 'type:visualization -is:active joe',
          incremental: true,
          schema,
        }}
        filters={filters}
        onChange={onChange}
      />
    );
  };

  const renderError = () => {
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
  };

  const renderTable = () => {
    const columns = [
      {
        name: 'Type',
        field: 'type',
      },
      {
        name: 'Open',
        field: 'status',
        render: (status) => (status === 'open' ? 'Yes' : 'No'),
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
        render: (item) => {
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

    const queriedItems = EuiSearchBar.Query.execute(query, items, {
      defaultFields: ['owner', 'tag', 'type'],
    });

    return <EuiBasicTable items={queriedItems} columns={columns} />;
  };

  const esQueryDsl = EuiSearchBar.Query.toESQuery(query);
  const esQueryString = EuiSearchBar.Query.toESQueryString(query);

  const content = renderError() || (
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

        {renderTable()}
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  return (
    <Fragment>
      {renderSearch()}
      <EuiSpacer size="l" />
      {content}
    </Fragment>
  );
};
