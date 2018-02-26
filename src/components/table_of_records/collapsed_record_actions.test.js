import React from 'react';
import { shallow } from 'enzyme';
import { CollapsedRecordActions } from './collapsed_record_actions';

describe('CollapsedRecordActions', () => {

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
      actionEnabled: () => true,
      onFocus: () => {}
    };

    const component = shallow(
      <CollapsedRecordActions {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
