import React from 'react';
import { times } from 'lodash';

import { EuiTableOfRecords, } from '../../../../src/components';
import { ValueRenderers } from '../../../../src/components/value_renderer';
import { EuiHealth } from '../../../../src/components/health';
import { Comparators } from '../../../../src/services/sort';

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
    list = people.sort(Comparators.property(sort.key, sort.direction));
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

export default class PeopleTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.computeState({
      page: {
        index: 0,
        size: 5
      }
    });
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

  render() {

    const config = {
      recordId: 'id',
      columns: [
        {
          key: 'firstName',
          name: 'First Name',
          description: `Person's given name`,
          dataType: 'string',
          sortable: true
        },
        {
          key: 'lastName',
          name: 'Last Name',
          description: `Person's family name`,
          dataType: 'string'
        },
        {
          key: 'nickname',
          name: 'Nickname',
          description: `Person's nickname / online handle`,
          render: ValueRenderers.link({
            onClick: (value) => {
              window.open(`http://www.github.com/${value}`, '_blank');
            }
          })
        },
        {
          key: 'dateOfBirth',
          name: 'Date of Birth',
          description: `Person's date of birth`,
          render: ValueRenderers.date.with({ format: 'D MMM YYYY' }),
          sortable: true
        },
        {
          key: 'online',
          name: 'Online',
          description: `Is this person is currently online?`,
          render: (value) => {
            const color = value ? 'success' : 'danger';
            const content = value ? 'Online' : 'Offline';
            return <EuiHealth color={color}>{content}</EuiHealth>;
          },
          sortable: true
        },
        {
          name: '',
          actions: [
            {
              type: 'icon',
              name: 'Delete',
              description: 'Delete this person',
              icon: 'trash',
              color: 'danger',
              onClick: (person) => this.deletePerson(person)
            }
          ]
        }
      ],
      pagination: {
        pageSizeOptions: [3, 5, 8]
      },

      selection: {
        selectable: (record) => record.online,
        selectableMessage: person => !person.online ? `${person.firstName} is offline` : undefined
      },

      onDataCriteriaChange: (criteria) => this.onDataCriteriaChange(criteria)

    };

    return <EuiTableOfRecords config={config} model={this.state}/>;
  }
}
