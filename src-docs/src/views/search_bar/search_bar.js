import React, { Component, Fragment } from 'react';
import { times } from 'lodash';

import {
  EuiHealth,
  EuiCallOut,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCodeBlock,
  EuiIcon,
  EuiTitle,
  EuiSwitch,
  EuiBasicTable,
  EuiSearchBar,
} from '../../../../src/components';

import {
  Query,
  Random,
} from '../../../../src/services';

const random = new Random();

const tags = [{
  name: 'marketing', status: 'off',
}, {
  name: 'finance', status: 'on',
}, {
  name: 'eng', status: 'on',
}, {
  name: 'sales', status: 'processing',
}, {
  name: 'ga', status: 'on',
}];

const types = [
  'dashboard',
  'visualization',
  'watch',
];

const users = [
  'dewey',
  'wanda',
  'carrie',
  'jmack',
  'gabic',
];

const items = times(10, (id) => {
  return {
    id,
    status: random.oneOf(['open', 'closed']),
    type: random.oneOf(types),
    tag: random.setOf(tags.map(tag => tag.name), { min: 0, max: 3 }),
    active: random.boolean(),
    owner: random.oneOf(users)
  };
});

const loadTags = () => {
  const statusToColorMap = {
    'on': 'success',
    'off': 'danger',
    'processing': 'warning',
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tags.map(tag => ({
        value: tag.name,
        view: <EuiHealth color={statusToColorMap[tag.status]}>{tag.name}</EuiHealth>
      })));
    }, 2000);
  });
};

const initialQuery = Query.MATCH_ALL;

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: initialQuery,
      result: items,
      error: null,
      incremental: false
    };
  }

  onParse = ({ error }) => {
    this.setState({ error });
  };

  onChange = (query) => {
    this.setState({
      error: null,
      query,
    });
  };

  toggleIncremental = () => {
    this.setState(prevState => ({ incremental: !prevState.incremental }));
  };

  renderSearch() {
    const {
      incremental,
    } = this.state;

    const filters = [{
      type: 'field_value_toggle_group',
      field: 'status',
      items: [{
        value: 'open',
        name: 'Open'
      }, {
        value: 'closed',
        name: 'Closed'
      }]
    }, {
      type: 'is',
      field: 'active',
      name: 'Active',
      negatedName: 'Inactive'
    }, {
      type: 'field_value_toggle',
      name: 'Mine',
      field: 'owner',
      value: 'dewey'
    }, {
      type: 'field_value_selection',
      field: 'tag',
      name: 'Tag',
      multiSelect: 'or',
      cache: 10000, // will cache the loaded tags for 10 sec
      options: () => loadTags()
    }];

    return (
      <EuiSearchBar
        defaultQuery={initialQuery}
        box={{
          placeholder: 'e.g. type:visualization -is:active joe',
          incremental
        }}
        filters={filters}
        onChange={this.onChange}
        onParse={this.onParse}
      />
    );
  }

  renderError() {
    const {
      error,
    } = this.state;

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
    const columns = [{
      name: 'Type',
      field: 'type'
    }, {
      name: 'Open',
      field: 'status',
      render: (status) => status === 'open' ? 'Yes' : 'No'
    }, {
      name: 'Active',
      field: 'active',
      dataType: 'boolean'
    }, {
      name: 'Tags',
      field: 'tag'
    }, {
      name: 'Owner',
      field: 'owner',
    }];

    const queriedItems = Query.execute(this.state.query, items, {
      defaultFields: ['owner', 'tag', 'type']
    });

    return (
     <EuiBasicTable
        items={queriedItems}
        columns={columns}
      />
    );
  }

  render() {
    const {
      incremental,
      error,
      query,
    } = this.state;

    const esQuery = Query.toESQuery(query);

    const content = this.renderError() || (
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h3>Elasticsearch query</h3>
          </EuiTitle>

          <EuiSpacer size="s" />

          <EuiCodeBlock language="js">
            {esQuery ? JSON.stringify(esQuery, null, 2) : ''}
          </EuiCodeBlock>
        </EuiFlexItem>

        <EuiFlexItem>
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
          <EuiFlexItem>
            {this.renderSearch()}
          </EuiFlexItem>

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
