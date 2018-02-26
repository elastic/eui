import React from 'react';
import { shallow } from 'enzyme';
import { ExpandedRecordActions } from './expanded_record_actions';

describe('ExpandedRecordActions', () => {

  test('render', () => {

    const props = {
      actions: [
        {
          name: 'default1',
          description: 'default 1',
          onClick: () => {
          }
        },
        {
          name: 'custom1',
          description: 'custom 1',
          render: () => {
          }
        }
      ],
      visible: true,
      recordId: 'id',
      record: { id: 'xyz' },
      model: {
        data: {
          records: [],
          totalRecordCount: 0
        },
        criteria: {
          page: {
            size: 5,
            index: 0
          }
        }
      },
      actionEnabled: () => true
    };

    const component = shallow(
      <ExpandedRecordActions {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
