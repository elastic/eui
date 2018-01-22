import React, {
  Component,
} from 'react';
import uuid from 'uuid/v1';
import { times } from 'lodash';

import {
  EuiTableOfRecords,
  EuiHealth,
  EuiCheckbox,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiValueRenderers,
} from '../../../../src/components';

import { Comparators } from '../../../../src/services';

const selectRandom = (...array) => {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
};

const people = times(20, (index) => {
  return {
    id: index,
    firstName: selectRandom('Martijn', 'Elissa', 'Clinton', 'Igor', 'Karl', 'Drew', 'Honza', 'Rashid', 'Jordan'),
    lastName: selectRandom('van Groningen', 'Weve', 'Gormley', 'Motov', 'Minarik', 'Raines', 'Král', 'Khan', 'Sissel'),
    nickname: selectRandom('mvg', 'elissa', 'clint', 'imotov', 'karmi', 'drewr', 'honza', 'rashidkpc', 'whack'),
    dateOfBirth: new Date(
      1990 + Math.floor(Math.random() * (1990 - 1971)), // year
      Math.floor(Math.random() * 12), // month
      Math.floor(Math.random() * 28), // day
      0, 0, 0, 0
    ),
    country: selectRandom('us', 'nl', 'cz', 'za', 'au'),
    online: selectRandom(true, false)
  };
});

function loadPage(pageIndex, pageSize, sort) {
  let list = people;
  if (sort) {
    list = people.sort(Comparators.property(sort.field, sort.direction));
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
      hasPagination: true,
      hasSorting: true,
      hasSelection: true,
      ...this.computeState({
        page: {
          index: 0,
          size: 5,
        },
      })
    };
  }

  computeState(criteria) {
    const page = loadPage(criteria.page.index, criteria.page.size, criteria.sort);
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
        sort: criteria.sort
      }
    };
  }

  onDataCriteriaChange(criteria) {
    this.setState(() => this.computeState(criteria));
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

  render() {
    const {
      hasPagination,
      hasSelection,
      hasSorting,
    } = this.state;

    const config = {
      recordId: 'id',
      columns: [
        {
          field: 'firstName',
          name: 'First Name',
          description: `Person's given name`,
          dataType: 'string',
          sortable: hasSorting,
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
          render: EuiValueRenderers.link({
            onClick: (value) => {
              window.open(`http://www.github.com/${value}`, '_blank');
            }
          })
        },
        {
          field: 'dateOfBirth',
          name: 'Date of Birth',
          description: `Person's date of birth`,
          render: EuiValueRenderers.date.with({ format: 'D MMM YYYY' }),
          sortable: hasSorting,
        },
        {
          field: 'online',
          name: 'Online',
          description: `Is this person is currently online?`,
          render: (value) => {
            const color = value ? 'success' : 'danger';
            const content = value ? 'Online' : 'Offline';
            return <EuiHealth color={color}>{content}</EuiHealth>;
          },
          sortable: hasSorting,
        },
        {
          name: '',
          actions: [
            {
              type: 'button',
              name: 'Clone',
              description: 'Clone this person',
              icon: 'copy',
              onClick: (person) => this.clonePerson(person)
            },
            {
              type: 'button',
              name: 'Delete',
              description: 'Delete this person',
              icon: 'trash',
              color: 'danger',
              onClick: (person) => this.deletePerson(person)
            },
            {
              type: 'custom',
              name: 'Online/Offline',
              description: 'toggles the online/offline state of the person',
              render: (person, model, enabled) => {
                const onChange = (event) => this.changePersonOnlineStatus(person, event.target.checked);
                return (
                  <EuiCheckbox
                    id={`${person.id}-online-cbx`}
                    className="euiContextMenu__itemLayout"
                    label={`Online`}
                    type="inList"
                    disabled={!enabled}
                    checked={person.online}
                    onChange={onChange}
                  />
                );
              }
            }
          ]
        }
      ],

      pagination: hasPagination ? {
        pageSizeOptions: [3, 5, 8]
      } : undefined,

      selection: hasSelection ? {
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
      },
    } = this.state;

    const model = {
      data,
      criteria: {
        page: hasPagination ? page : undefined,
        sort: hasSorting ? sort : undefined,
      },
    };

    return (
      <div>
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Pagination"
              checked={this.state.hasPagination}
              onChange={() => { this.setState({ hasPagination: !this.state.hasPagination }); }}
            />
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Sorting"
              checked={this.state.hasSorting}
              onChange={() => { this.setState({ hasSorting: !this.state.hasSorting }); }}
            />
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Selection"
              checked={this.state.hasSelection}
              onChange={() => { this.setState({ hasSelection: !this.state.hasSelection }); }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiTableOfRecords config={config} model={model} />
      </div>
    );
  }
}
