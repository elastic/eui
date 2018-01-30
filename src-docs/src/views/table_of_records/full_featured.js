import React, {
  Component,
} from 'react';
import uuid from 'uuid/v1';
import { times } from 'lodash';

import {
  EuiTableOfRecords,
  EuiHealth,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiSpacer,
} from '../../../../src/components';

import {
  formatDate,
  Random,
  Comparators
} from '../../../../src/services';

const random = new Random();

const people = times(20, (index) => {
  return {
    id: index,
    firstName: random.oneOf('Martijn', 'Elissa', 'Clinton', 'Igor', 'Karl', 'Drew', 'Honza', 'Rashid', 'Jordan'),
    lastName: random.oneOf('van Groningen', 'Weve', 'Gormley', 'Motov', 'Minarik', 'Raines', 'Král', 'Khan', 'Sissel'),
    nickname: random.oneOf('martijnvg', 'elissaw', 'clintongormley', 'imotov', 'karmi', 'drewr', 'HonzaKral', 'rashidkpc', 'whack'),
    dateOfBirth: random.date({ min: new Date(1971, 0, 0), max: new Date(1990, 0, 0) }),
    country: random.oneOf('us', 'nl', 'cz', 'za', 'au'),
    online: random.boolean()
  };
});

function loadPage(query, pageIndex, pageSize, sort) {
  let list = people;
  if (query) {
    const normalizedQuery = query.toLowerCase();
    list = people.filter(person => {
      return [ 'firstName', 'lastName', 'nickname' ].some((field => {
        return person[field] && person[field].toLowerCase().startsWith(normalizedQuery);
      }));
    });
  }
  if (sort) {
    list = list.sort(Comparators.property(sort.field, Comparators.default(sort.direction)));
  }
  if (!pageIndex && !pageSize) {
    return {
      index: 0,
      size: list.length,
      items: list,
      totalRecordCount: list.length
    };
  }
  const from = pageIndex * pageSize;
  const items = list.slice(from, Math.min(from + pageSize, list.length));
  return {
    index: pageIndex,
    size: pageSize,
    items,
    totalRecordCount: list.length
  };
}

export default class PeopleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      features: {
        search: true,
        pagination: true,
        sorting: true,
        selection: true,
        multipleRecordActions: true
      },
      ...this.computeTableState({
        page: {
          index: 0,
          size: 5,
        },
        search: { query: '' }
      })
    };
  }

  computeTableState(criteria) {
    const query = criteria.search ? criteria.search.query : undefined;
    const pageIndex = criteria.page ? criteria.page.index : undefined;
    const pageSize = criteria.page ? criteria.page.size : undefined;
    const sort = criteria.sort;
    const page = loadPage(query, pageIndex, pageSize, sort);
    return {
      data: {
        records: page.items,
        totalRecordCount: page.totalRecordCount
      },
      criteria: {
        page: {
          index: page.index,
          size: page.size
        },
        search: { query },
        sort
      }
    };
  }

  onDataCriteriaChange(criteria) {
    this.setState(this.computeTableState(criteria));
  }

  deletePerson(personToDelete) {
    const i = people.findIndex((person) => person.id === personToDelete.id);
    if (i >= 0) {
      people.splice(i, 1);
    }
    this.onDataCriteriaChange(this.state.criteria);
  }

  clonePerson(personToClone) {
    const i = people.findIndex((person) => person.id === personToClone.id);
    const clone = { ...personToClone, id: uuid() };
    people.splice(i, 0, clone);
    this.onDataCriteriaChange(this.state.criteria);
  }

  changePersonOnlineStatus(personToUpdate, online) {
    const person = people.find((person) => person.id === personToUpdate.id);
    if (person) {
      person.online = online;
    }
    this.onDataCriteriaChange(this.state.criteria);
  }

  toggleFeature(feature) {
    this.setState(prevState => ({
      features: {
        ...prevState.features,
        [feature]: !prevState.features[feature]
      }
    }));
  }

  render() {
    const { features } = this.state;

    const config = {
      recordId: 'id',
      columns: [
        {
          field: 'firstName',
          name: 'First Name',
          description: `Person's given name`,
          dataType: 'string',
          sortable: features.sorting,
        },
        {
          field: 'lastName',
          name: 'Last Name',
          description: `Person's family name`,
          dataType: 'string'
        },
        {
          field: 'nickname',
          name: 'Nickname',
          description: `Person's nickname / online handle`,
          render: value => (
            <EuiLink href={`http://www.github.com/${value}`} target="_blank">
              {value}
            </EuiLink>
          )
        },
        {
          field: 'dateOfBirth',
          name: 'Date of Birth',
          description: `Person's date of birth`,
          render: value => formatDate(value, 'D MMM YYYY'),
          sortable: features.sorting,
          dataType: 'date'
        },
        {
          field: 'online',
          name: 'Online',
          description: `Is this person currently online?`,
          render: (value) => {
            const color = value ? 'success' : 'danger';
            const content = value ? 'Online' : 'Offline';
            return <EuiHealth color={color}>{content}</EuiHealth>;
          },
          sortable: features.sorting
        },
        {
          name: '',
          actions: features.multipleRecordActions ? [
            {
              name: 'Clone',
              description: 'Clone this person',
              icon: 'copy',
              onClick: (person) => this.clonePerson(person)
            },
            {
              name: 'Delete',
              description: 'Delete this person',
              icon: 'trash',
              color: 'danger',
              onClick: (person) => this.deletePerson(person)
            },
            // uncomment once context menu officially supports checkbox elements
            // see https://github.com/elastic/eui/issues/336
            // {
            //   name: 'Online/Offline',
            //   description: 'toggles the online/offline state of the person',
            //   render: (person, model, enabled) => {
            //     const onChange = (event) => this.changePersonOnlineStatus(person, event.target.checked);
            //     return (
            //       <EuiCheckbox
            //         id={`${person.id}-online-cbx`}
            //         className="euiContextMenu__itemLayout"
            //         label={`Online`}
            //         type="inList"
            //         disabled={!enabled}
            //         checked={person.online}
            //         onChange={onChange}
            //       />
            //     );
            //   }
            // }
          ] : [
            {
              name: 'Delete',
              description: 'Delete this person',
              icon: 'trash',
              type: 'icon',
              color: 'danger',
              onClick: (person) => this.deletePerson(person)
            }
          ]
        }
      ],

      search: features.search ? {
        box: { placeholder: 'Find person...' }
      } : undefined,

      pagination: features.pagination ? {
        pageSizeOptions: [3, 5, 8]
      } : undefined,

      selection: features.selection ? {
        selectable: (record) => record.online,
        selectableMessage: person => !person.online ? `${person.firstName} is offline` : undefined
      } : undefined,

      onDataCriteriaChange: (criteria) => this.onDataCriteriaChange(criteria)
    };

    const {
      data,
      criteria: {
        page,
        sort,
        search
      },
    } = this.state;

    const model = {
      data,
      criteria: {
        search: features.search ? search : undefined,
        sort: features.sorting ? sort : undefined,
        page: features.pagination ? page : undefined
      },
    };

    return (
      <div>
        <EuiFlexGroup>

          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Search"
              checked={features.search}
              onChange={this.toggleFeature.bind(this, 'search')}
            />
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Pagination"
              checked={features.pagination}
              onChange={this.toggleFeature.bind(this, 'pagination')}
            />
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Sorting"
              checked={features.sorting}
              onChange={this.toggleFeature.bind(this, 'sorting')}
            />
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Selection"
              checked={features.selection}
              onChange={this.toggleFeature.bind(this, 'selection')}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Multiple Record Actions"
              checked={features.multipleRecordActions}
              onChange={this.toggleFeature.bind(this, 'multipleRecordActions')}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiTableOfRecords config={config} model={model} />
      </div>
    );
  }
}
