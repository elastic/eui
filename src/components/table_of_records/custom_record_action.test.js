import React from 'react';
import { shallow } from 'enzyme/build/index';
import { CustomRecordAction } from './custom_record_action';

describe('CustomRecordAction', () => {

  test('render', () => {

    const props = {
      action: {
        name: 'custom1',
        description: 'custom 1',
        render: () => 'test'
      },
      enabled: true,
      visible: true,
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
      }
    };

    const component = shallow(
      <CustomRecordAction {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
