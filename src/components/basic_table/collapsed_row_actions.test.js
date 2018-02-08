import React from 'react';
import { shallow } from 'enzyme/build/index';
import { CollapsedRowActions } from './collapsed_row_actions';

describe('CollapsedRowActions', () => {

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
      rowId: 'id',
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
      },
      actionEnabled: () => true,
      onFocus: () => {}
    };

    const component = shallow(
      <CollapsedRowActions {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
