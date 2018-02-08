import React from 'react';
import { shallow } from 'enzyme/build/index';
import { CustomRowAction } from './custom_row_action';

describe('CustomRowAction', () => {

  test('render', () => {

    const props = {
      action: {
        name: 'custom1',
        description: 'custom 1',
        render: () => 'test'
      },
      enabled: true,
      visible: true,
      row: { id: 'xyz' },
      model: {
        data: {
          rows: [],
          totalRowCount: 0
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
      <CustomRowAction {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
