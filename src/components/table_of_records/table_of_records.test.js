import React from 'react';
import { shallow } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTableOfRecords } from './table_of_records';

describe('EuiTableOfRecords', () => {

  test('basic - empty', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description'
          }
        ]
      },
      model: {
        data: {
          records: [],
          totalRecordCount: 0
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('basic - with records', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description'
          }
        ]
      },
      model: {
        data: {
          records: [
            { id: '1', name: 'name1' },
            { id: '2', name: 'name2' },
            { id: '3', name: 'name3' }
          ],
          totalRecordCount: 3
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description'
          }
        ],
        pagination: {},
        onDataCriteriaChange: () => undefined
      },
      model: {
        data: {
          records: [
            { id: '1', name: 'name1' },
            { id: '2', name: 'name2' },
            { id: '3', name: 'name3' }
          ],
          totalRecordCount: 5
        },
        criteria: {
          page: {
            index: 0,
            size: 3
          }
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination - 2nd page', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description'
          }
        ],
        pagination: {},
        onDataCriteriaChange: () => undefined
      },
      model: {
        data: {
          records: [
            { id: '1', name: 'name1' },
            { id: '2', name: 'name2' }
          ],
          totalRecordCount: 5
        },
        criteria: {
          page: {
            index: 1,
            size: 3
          }
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with sorting', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true
          }
        ],
        onDataCriteriaChange: () => undefined
      },
      model: {
        data: {
          records: [
            { id: '1', name: 'name1' },
            { id: '2', name: 'name2' },
            { id: '3', name: 'name3' }
          ],
          totalRecordCount: 3
        },
        criteria: {
          sort: { field: 'name', direction: 'asc' }
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination and selection', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description'
          }
        ],
        pagination: {},
        selection: {
          onSelectionChanged: () => undefined
        },
        onDataCriteriaChange: () => undefined
      },
      model: {
        data: {
          records: [
            { id: '1', name: 'name1' },
            { id: '2', name: 'name2' },
            { id: '3', name: 'name3' }
          ],
          totalRecordCount: 5
        },
        criteria: {
          page: {
            index: 0,
            size: 3
          }
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection and sorting', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true
          }
        ],
        pagination: {},
        selection: {
          onSelectionChanged: () => undefined
        },
        onDataCriteriaChange: () => undefined
      },
      model: {
        data: {
          records: [
            { id: '1', name: 'name1' },
            { id: '2', name: 'name2' },
            { id: '3', name: 'name3' }
          ],
          totalRecordCount: 5
        },
        criteria: {
          page: {
            index: 0,
            size: 3
          }
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and column renderer', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true,
            render: (name) => name.toUpperCase()
          }
        ],
        pagination: {},
        selection: {
          onSelectionChanged: () => undefined
        },
        onDataCriteriaChange: () => undefined
      },
      model: {
        data: {
          records: [
            { id: '1', name: 'name1' },
            { id: '2', name: 'name2' },
            { id: '3', name: 'name3' }
          ],
          totalRecordCount: 5
        },
        criteria: {
          page: {
            index: 0,
            size: 3
          }
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and column dataType', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'count',
            name: 'Count',
            description: 'description',
            sortable: true,
            dataType: 'number'
          }
        ],
        pagination: {},
        selection: {
          onSelectionChanged: () => undefined
        },
        onDataCriteriaChange: () => undefined
      },
      model: {
        data: {
          records: [
            { id: '1', count: 1 },
            { id: '2', count: 2 },
            { id: '3', count: 3 }
          ],
          totalRecordCount: 5
        },
        criteria: {
          page: {
            index: 0,
            size: 3
          }
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  // here we want to verify that the column renderer takes precedence over the column data type
  test('with pagination, selection, sorting, column renderer and column dataType', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'count',
            name: 'Count',
            description: 'description',
            sortable: true,
            dataType: 'number',
            render: (count) => 'x'.repeat(count)
          }
        ],
        pagination: {},
        selection: {
          onSelectionChanged: () => undefined
        },
        onDataCriteriaChange: () => undefined
      },
      model: {
        data: {
          records: [
            { id: '1', count: 1 },
            { id: '2', count: 2 },
            { id: '3', count: 3 }
          ],
          totalRecordCount: 5
        },
        criteria: {
          page: {
            index: 0,
            size: 3
          }
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and a single record action', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true
          },
          {
            actions: [
              {
                type: 'button',
                name: 'Edit',
                description: 'edit',
                onClick: () => undefined
              }
            ]
          }
        ],
        pagination: {},
        selection: {
          onSelectionChanged: () => undefined
        },
        onDataCriteriaChange: () => undefined
      },
      model: {
        data: {
          records: [
            { id: '1', name: 'name1' },
            { id: '2', name: 'name2' },
            { id: '3', name: 'name3' }
          ],
          totalRecordCount: 5
        },
        criteria: {
          page: {
            index: 0,
            size: 3
          }
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('with pagination, selection, sorting and multiple record actions', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
            sortable: true
          },
          {
            actions: [
              {
                type: 'button',
                name: 'Edit',
                description: 'edit',
                onClick: () => undefined
              },
              {
                type: 'button',
                name: 'Delete',
                description: 'delete',
                onClick: () => undefined
              }
            ]
          }
        ],
        pagination: {},
        selection: {
          onSelectionChanged: () => undefined
        },
        onDataCriteriaChange: () => undefined
      },
      model: {
        data: {
          records: [
            { id: '1', name: 'name1' },
            { id: '2', name: 'name2' },
            { id: '3', name: 'name3' }
          ],
          totalRecordCount: 5
        },
        criteria: {
          page: {
            index: 0,
            size: 3
          }
        }
      }
    };


    const component = shallow(
      <EuiTableOfRecords {...props} />
    );

    expect(component).toMatchSnapshot();
  });

});
