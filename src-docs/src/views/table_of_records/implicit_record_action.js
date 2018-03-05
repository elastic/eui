import React from 'react';
import { times } from 'lodash';

import {
  EuiTableOfRecords,
  EuiSwitch,
  EuiIcon,
  EuiLink,
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
    firstName: random.oneOf(['Martijn', 'Elissa', 'Clinton', 'Igor', 'Karl', 'Drew', 'Honza', 'Rashid', 'Jordan']),
    lastName: random.oneOf(['van Groningen', 'Weve', 'Gormley', 'Motov', 'Minarik', 'Raines', 'Král', 'Khan', 'Sissel']),
    nickname: random.oneOf(['martijnvg', 'elissaw', 'clintongormley', 'imotov', 'karmi', 'drewr', 'HonzaKral', 'rashidkpc', 'whack']),
    dateOfBirth: random.date({ min: new Date(1971, 0, 0), max: new Date(1990, 0, 0) }),
    country: random.oneOf(['us', 'nl', 'cz', 'za', 'au']),
    online: random.boolean()
  };
});

function loadPage(pageIndex, pageSize, sort) {
  let list = people;
  if (sort) {
    list = people.sort(Comparators.property(sort.field, Comparators.default(sort.direction)));
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

  computeState(criteria, selection = []) {
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
      },
      selection
    };
  }

  onDataCriteriaChange(criteria) {
    this.setState((prevState) => this.computeState(criteria, prevState.selection));
  }

  onPersonOnlineStatusChange(personId, online) {
    const person = people.find(person => person.id === personId);
    if (person) {
      person.online = online;
    }
    this.onDataCriteriaChange(this.state.criteria);
  }

  onSelectionChanged(selection) {
    this.setState({ selection });
  }

  render() {

    const config = {
      recordId: 'id',
      columns: [
        {
          width: '30px',
          align: 'right',
          render: (person) => {
            const color = person.online ? 'success' : 'subdued';
            const title = person.online ? 'Online' : 'Offline';
            return <EuiIcon type="user" color={color} title={title}/>;
          }
        },
        {
          field: 'firstName',
          name: 'First Name',
          description: `Person's given name`,
          dataType: 'string',
          sortable: true
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
          sortable: true
        },
        {
          field: 'online',
          name: 'Online',
          description: `Is this person is currently online?`,
          render: (online, person) => {
            const disabled = this.state.selection.length !== 0;
            const onChange = (event) => {
              this.onPersonOnlineStatusChange(person.id, event.target.checked);
            };
            return <EuiSwitch id={`${person.id}-online`} onChange={onChange} checked={online} disabled={disabled} />;
          },
          sortable: true
        }
      ],
      pagination: {
        pageSizeOptions: [3, 5, 8]
      },

      selection: {
        selectable: (record) => record.online,
        selectableMessage: person => !person.online ? `${person.firstName} is offline` : undefined,
        onSelectionChanged: (selection) => this.onSelectionChanged(selection)
      },

      onDataCriteriaChange: (criteria) => this.onDataCriteriaChange(criteria, this.state.selection)

    };

    return <EuiTableOfRecords config={config} model={this.state}/>;
  }
}
