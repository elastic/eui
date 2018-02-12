import React, {
  Component
} from 'react';
import { formatDate } from '../../../../../src/services/format';
import { createDataStore } from '../data_store';
import { EuiBasicTableContainer } from '../../../../../src/components/basic_table';
import { EuiLink } from '../../../../../src/components/link/link';
import { EuiHealth } from '../../../../../src/components/health';
import { EuiButton } from '../../../../../src/components/button/button';
import { Random } from '../../../../../src/services/random';
import { browserTick } from '../../../../../src/services/utils';
import { EuiFlexGroup } from '../../../../../src/components/flex/flex_group';
import { EuiFlexItem } from '../../../../../src/components/flex/flex_item';
import { EuiSwitch } from '../../../../../src/components/form/switch/switch';
import { EuiSpacer } from '../../../../../src/components/spacer/spacer';
/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true
}

Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}
*/

const random = new Random();

const store = createDataStore();

const loadItems = (criteria) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { page, sort } = criteria;
      const { items, totalCount } = store.findUsers(page.index, page.size, sort);
      resolve({ items, totalCount });
    }, random.number({ min: 0, max: 3000 }));
  });
};

const loadItemsError = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('ouch! that hurt!!!'));
    }, random.number({ min: 0, max: 3000 }));
  });
};

const loadItemsZeroResults = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ items: [], totalCount: 0 });
    }, random.number({ min: 0, max: 3000 }));
  });
};

export class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selection: [],
      loader: loadItems
    };
  }

  renderDeleteButton() {
    const selection = this.state.selection;
    if (selection.length === 0) {
      return;
    }
    const onClick = () => {
      store.deleteUsers(...selection.map(user => user.id));
      this.setState({ selection: [] });
      this.table.refresh();
    };
    return (
      <EuiButton
        color="danger"
        iconType="trash"
        onClick={onClick}
      >
        Delete {selection.length} Users
      </EuiButton>
    );
  }

  updateLoader(loader) {
    this.setState({ loader });
    browserTick(() => this.table.refresh());
  }

  render() {
    const deleteButton = this.renderDeleteButton();
    return (
      <div>
        <EuiFlexGroup alignItems="center">
          { deleteButton ? <EuiFlexItem grow={false}>{deleteButton}</EuiFlexItem> : undefined }
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Normal Loader"
              checked={this.state.loader === loadItems}
              onChange={this.updateLoader.bind(this, loadItems)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Error Loader"
              checked={this.state.loader === loadItemsError}
              onChange={this.updateLoader.bind(this, loadItemsError)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="No Items Loader"
              checked={this.state.loader === loadItemsZeroResults}
              onChange={this.updateLoader.bind(this, loadItemsZeroResults)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="l"/>
        <EuiBasicTableContainer
          ref={(table) => this.table = table}
          items={this.state.loader}
          columns={[
            {
              field: 'firstName',
              name: 'First Name',
              sortable: true
            },
            {
              field: 'lastName',
              name: 'Last Name'
            },
            {
              field: 'github',
              name: 'Github',
              render: (username) => (
                <EuiLink href={`https://github.com/${username}`} target="_blank">{username}</EuiLink>
              )
            },
            {
              field: 'dateOfBirth',
              name: 'Date of Birth',
              dataType: 'date',
              render: (date) => formatDate(date, 'dobLong'),
              sortable: true
            },
            {
              field: 'nationality',
              name: 'Nationality',
              render: (countryCode) => {
                const country = store.getCountry(countryCode);
                return `${country.flag} ${country.name}`;
              }
            },
            {
              field: 'online',
              name: 'Online',
              dataType: 'boolean',
              render: (online) => {
                const color = online ? 'success' : 'danger';
                const label = online ? 'Online' : 'Offline';
                return <EuiHealth color={color}>{label}</EuiHealth>;
              },
              sortable: true
            }
          ]}
          pagination={{
            pageSizeOptions: [3, 5, 8]
          }}
          sorting={true}
          selection={{
            itemId: 'id',
            selectable: (user) => user.online,
            selectableMessage: (selectable) => !selectable ? 'User is currently offline' : undefined,
            onSelectionChange: (selection) => this.setState({ selection })
          }}
        />
      </div>
    );
  }
}
