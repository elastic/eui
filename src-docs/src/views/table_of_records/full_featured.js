import React, {
  Component,
} from 'react';
import uuid from 'uuid/v1';
import { times } from 'lodash';

import {
  EuiButton,
  EuiTableOfRecords,
  EuiHealth,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiSpacer,
  EuiHorizontalRule,
  EuiTitle,
} from '../../../../src/components';

import {
  formatDate,
  Random,
  Comparators
} from '../../../../src/services';
import { Query } from '../../../../src/components/table_of_records/search/query';
import { EuiBadge } from '../../../../src/components/badge';
import { executeCriteria } from '../../../../src/components/table_of_records';

const random = new Random();

const countries = [
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'US', name: 'United States', flag: '🇺🇲' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
];

const loadCountries = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = countries.sort(Comparators.default());
      resolve(result);
    }, random.integer({ min: 0, max: 1000 }));
  });
};

const groups = [ 'eng', 'es', 'kibana', 'logstash', 'beats', 'sales' ];

const people = times(20, (index) => {
  return {
    id: index,
    firstName: random.oneOf([ 'Martijn', 'Elissa', 'Clinton', 'Igor', 'Karl', 'Drew', 'Honza', 'Rashid', 'Jordan' ]),
    lastName: random.oneOf([ 'van Groningen', 'Weve', 'Gormley', 'Motov', 'Minarik', 'Raines', 'Král', 'Khan', 'Sissel' ]),
    nickname: random.oneOf([ 'martijnvg', 'elissaw', 'clintongormley', 'imotov', 'karmi', 'drewr', 'HonzaKral', 'rashidkpc', 'whack' ]),
    dateOfBirth: random.date({ min: new Date(1971, 0, 0), max: new Date(1990, 0, 0) }),
    nationality: random.oneOf(countries.map(country => country.code)),
    group: random.setOf(groups, { max: 3 }),
    online: random.boolean()
  };
});

export default class PeopleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIds: [],
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
        search: { query: Query.parse('') }
      })
    };
  }

  computeTableState(criteria) {
    console.debug(JSON.stringify(criteria.search.query.ast));
    const result = executeCriteria(people, criteria);
    return {
      data: {
        records: result.hits,
        totalRecordCount: result.total
      },
      criteria
    };
  }

  onSelectionChanged = selection => {
    const selectedIds = selection.map(item => item.id);
    this.setState({
      selectedIds,
    });
  };

  onDataCriteriaChange(criteria) {
    this.setState(this.computeTableState(criteria));
  }

  deletePerson(personToDelete) {
    const i = people.findIndex((person) => person.id === personToDelete.id);
    if (i !== -1) {
      people.splice(i, 1);
    }
    this.onDataCriteriaChange(this.state.criteria);
  }

  deleteSelectedPeople = () => {
    this.state.selectedIds.forEach(id => {
      const i = people.findIndex((person) => person.id === id);
      if (i !== -1) {
        people.splice(i, 1);
      }
    });
    this.onDataCriteriaChange(this.state.criteria);
  };

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
          field: 'nationality',
          name: 'Nationality',
          width: '200px',
          render: code => {
            const country = countries.find(country => country.code === code);
            return country ? <span>{country.flag}&nbsp;{country.name}</span> : '';
          }
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
          field: 'group',
          name: 'Group',
          render: groups => <div>{groups.map((group, index) => <EuiBadge key={index}>{group}</EuiBadge>)}</div>
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
            }
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
        box: {
          placeholder: 'Find person...',
          incremental: false
        },
        filters: [
          {
            type: 'is',
            field: 'online',
            name: 'Online'
          },
          {
            type: 'field_value_selection',
            field: 'nationality',
            name: 'Nationality',
            multiSelect: false,
            loadingMessage: 'Loading nationalities...',
            noOptionsMessage: 'No nationalities found',
            options: () => {
              return loadCountries().then((countries) => {
                return countries.map(country => ({
                  value: country.code,
                  name: country.name,
                  view: <span>{country.flag}&nbsp;{country.name}</span>
                }));
              });
            },
            cacheOptions: 20000 // caching the fetched options for 20 seconds
          },
          {
            type: 'field_value_selection',
            field: 'group',
            name: 'Group',
            options: groups.map(group => ({ value: group, name: group }))
          }
        ]
      } : undefined,

      pagination: features.pagination ? {
        pageSizeOptions: [3, 5, 8]
      } : undefined,

      selection: features.selection ? {
        selectable: (record) => record.online,
        selectableMessage: person => !person.online ? `${person.firstName} is offline` : undefined,
        onSelectionChanged: this.onSelectionChanged,
      } : undefined,

      onDataCriteriaChange: (criteria) => this.onDataCriteriaChange(criteria)
    };

    const {
      selectedIds,
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

    let deleteButton;

    if (selectedIds.length) {
      const label = selectedIds.length > 1 ? `Delete ${selectedIds.length} people` : `Delete 1 person`;
      deleteButton = (
        <EuiFlexItem grow={false}>
          <EuiButton color="danger" onClick={this.deleteSelectedPeople}>
            {label}
          </EuiButton>
        </EuiFlexItem>
      );
    }

    return (
      <div>
        <EuiTitle size="s">
          <p>Toggle demo functionality</p>
        </EuiTitle>
        <EuiSpacer size="m" />
        <EuiFlexGroup alignItems="center">

          { deleteButton }

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

        <EuiHorizontalRule />
        <EuiSpacer size="m" />
        <EuiTitle>
          <p>List of people</p>
        </EuiTitle>
        <EuiSpacer size="m" />
        <EuiTableOfRecords config={config} model={model} />
      </div>
    );
  }
}
