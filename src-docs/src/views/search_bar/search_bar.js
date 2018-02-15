import React, { Fragment } from 'react';
import { Random } from '../../../../src/services/random';
import {
  EuiSearchBar,
  Query
} from '../../../../src/components/search_bar';
import { EuiHealth } from '../../../../src/components/health';
import { EuiCallOut } from '../../../../src/components/call_out';
import { EuiSpacer } from '../../../../src/components/spacer/spacer';
import { EuiFlexGroup } from '../../../../src/components/flex/flex_group';
import { EuiFlexItem } from '../../../../src/components/flex/flex_item';
import { EuiCodeBlock } from '../../../../src/components/code';
import { times } from 'lodash';
import { EuiIcon } from '../../../../src/components/icon/icon';
import { EuiTitle } from '../../../../src/components/title';
import { EuiSwitch } from '../../../../src/components/form/switch/switch';
import { EuiBasicTable } from '../../../../src/components/basic_table';

const random = new Random();

const tags = [
  { value: 'marketing', view: (<EuiHealth color="danger">marketing</EuiHealth>) },
  { value: 'finance', view: (<EuiHealth color="success">finance</EuiHealth>) },
  { value: 'eng', view: (<EuiHealth color="success">eng</EuiHealth>) },
  { value: 'sales', view: (<EuiHealth color="success">sales</EuiHealth>) },
  { value: 'ga', view: (<EuiHealth color="warning">ga</EuiHealth>) }
];

const types = [
  { value: 'dashboard', view: (<div><EuiIcon type="dashboardApp" size="s"/> Dashboard</div>) },
  { value: 'visualization', view: (<div><EuiIcon type="visualizeApp" size="s"/> Visualization</div>) },
  { value: 'watch', view: (<div><EuiIcon type="watchesApp" size="s"/> Watch</div>) }
];

const users = [
  { value: 'dewey', name: 'Dewey Caldwell', view: (<div><EuiIcon type="user" size="s"/>Dewey Caldwell</div>) },
  { value: 'wanda', name: 'Wanda Potter', view: (<div><EuiIcon type="user" size="s"/>Wanda Potter</div>) },
  { value: 'carrie', name: 'Carrie Hamilton', view: (<div><EuiIcon type="user" size="s"/>Carrie Hamilton</div>) },
  { value: 'jmack', name: 'Joann Mack', view: (<div><EuiIcon type="user" size="s"/>Joann Mack</div>) },
  { value: 'gabic', name: 'Gabriel Curtis', view: (<div><EuiIcon type="user" size="s"/>Gabriel Curtis</div>) },
];

const items = times(10, (id) => {
  return {
    id,
    status: random.oneOf('open', 'closed'),
    type: random.oneOf(...types.map(type => type.value)),
    tag: random.setOf(tags.map(tag => tag.value), { min: 0, max: 3 }),
    active: random.boolean(),
    owner: random.oneOf(...users.map(user => user.value))
  };
});

const loadTags = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tags);
    }, random.number({ min: 0, max: 2000 }));
  });
};

const initialQuery = Query.MATCH_ALL;

export class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      esQuery: Query.toESQuery(initialQuery),
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
      result: Query.execute(query, items, { defaultFields: ['owner', 'tag', 'type'] }),
      esQuery: Query.toESQuery(query)
    });
  };

  toggleIncremental = () => {
    this.setState(prevState => ({ incremental: !prevState.incremental }));
  };

  render() {
    return (
      <Fragment>
        <div>
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem>
              <EuiSearchBar
                defaultQuery={initialQuery}
                box={{
                  placeholder: 'e.g. type:visualization -is:active joe',
                  incremental: this.state.incremental
                }}
                filters={[
                  {
                    type: 'field_value_toggle_group',
                    field: 'status',
                    items: [
                      {
                        value: 'open',
                        name: 'Open'
                      },
                      {
                        value: 'closed',
                        name: 'Closed'
                      }
                    ]
                  },
                  {
                    type: 'is',
                    field: 'active',
                    name: 'Active',
                    negatedName: 'Inactive'
                  },
                  {
                    type: 'field_value_toggle',
                    name: 'Mine',
                    field: 'owner',
                    value: 'dewey'
                  },
                  {
                    type: 'field_value_selection',
                    field: 'tag',
                    name: 'Tag',
                    multiSelect: 'or',
                    cache: 10000, // will cache the loaded tags for 10 sec
                    options: () => loadTags()
                  }
                ]}
                onChange={this.onChange}
                onParse={this.onParse}
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label="Incremental"
                checked={this.state.incremental}
                onChange={this.toggleIncremental}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="l"/>
          <EuiCallOut
            iconType={this.state.error ? 'faceSad' : 'faceHappy'}
            color={this.state.error ? 'danger' : 'success'}
            title={this.state.error ? this.state.error.message : 'valid!'}
          />
        </div>
        <EuiSpacer size="l"/>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiTitle size="s"><h1>Elasticsearch Query</h1></EuiTitle>
            <EuiSpacer size="s"/>
            <EuiCodeBlock language="js">
              {this.state.esQuery ? JSON.stringify(this.state.esQuery, null, 2) : ''}
            </EuiCodeBlock>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiTitle size="s"><h1>JS Execution</h1></EuiTitle>
            <EuiSpacer size="s"/>
            <EuiBasicTable
              items={this.state.result}
              columns={[
                {
                  name: 'Type',
                  field: 'type'
                },
                {
                  name: 'Open',
                  field: 'status',
                  render: (status) => status === 'open' ? 'Yes' : 'No'
                },
                {
                  name: 'Active',
                  field: 'active',
                  dataType: 'boolean'
                },
                {
                  name: 'Tags',
                  field: 'tag'
                },
                {
                  name: 'Owner',
                  field: 'owner',
                  render: (username) => {
                    const user = users.find(user => user.value === username);
                    return user.name;
                  }
                }
              ]}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );
  }
}
