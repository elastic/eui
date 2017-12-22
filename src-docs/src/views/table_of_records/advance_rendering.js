import React from 'react';
import { times } from 'lodash';

import { EuiTableOfRecords, } from '../../../../src/components';
import { ValueRenderers } from '../../../../src/services/value_renderer';
import { EuiHealth } from '../../../../src/components/health';

const selectRandom = (...array) => {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
};

const people = times(20, (index) => {
  return {
    id: index,
    firstName: selectRandom('Martijn', 'Elissa', 'Clinton', 'Igor', 'Karl', 'Drew', 'Honza', 'Jordan'),
    lastName: selectRandom('van Groningen', 'Weve', 'Gormley', 'Motov', 'Minarik', 'Raines', 'Král', 'Sissel'),
    nickname: selectRandom('mvg', 'elissa', 'clint', 'imotov', 'karmi', 'drewr', 'honza', 'whack'),
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

export default class PeopleTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: this.loadPage(0, 5),
      selection: []
    };
  }

  loadPage(pageIndex, pageSize) {
    const from = pageIndex * pageSize;
    const items = people.slice(from, Math.min(from + pageSize, people.length));
    return {
      index: pageIndex,
      size: pageSize,
      items,
      totalItemCount: people.length
    };
  }

  onPageChange(index) {
    const page = this.loadPage(index, this.state.page.size);
    this.setState({ page });
  }

  onPageSizeChange(size) {
    const page = this.loadPage(this.state.page.index, size);
    this.setState({ page });
  }

  onSelectionChanged(selection) {
    this.setState((prevState) => ({
      ...prevState,
      selection
    }));
  }

  render() {

    const config = {
      recordId: 'id',
      columns: [
        {
          key: 'firstName',
          name: 'First Name',
          description: `Person's given name`,
          dataType: 'string'
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
          render: ValueRenderers.date.with({ format: 'D MMM YYYY' })
        },
        {
          key: 'online',
          name: 'Online',
          description: `Is this person is currently online?`,
          render: (value) => {
            const color = value ? 'success' : 'danger';
            const content = value ? 'Online' : 'Offline';
            return <EuiHealth color={color}>{content}</EuiHealth>;
          }
        }
      ],
      pagination: {
        // called whenever the user chooses to change the page size. It's the
        // responsibility of the consumer to update the state accordingly
        onPageSizeChange: (size) => this.onPageSizeChange(size),
        // called every time the page is changing, it's the responsibility
        // of the consumer to update the state accordingly
        onPageChange: (index) => this.onPageChange(index),
        // this will let the user change the page size, with these sizes
        // serving as the optional page sizes to show
        pageSizeOptions: [3, 5, 8]
      },

      selection: {
        selectable: (record) => record.online,
        onSelectionChanged: (selection) => this.onSelectionChanged(selection)
      }

    };

    return <EuiTableOfRecords config={config} model={this.state}/>;
  }
}
