import React from 'react';
import { shallow } from 'enzyme/build/index';
import { DefaultRowAction } from './default_row_action';
import { Random } from '../../services/random';

const random = new Random();

describe('DefaultRowAction', () => {

  test('render - button', () => {

    const props = {
      action: {
        name: 'action1',
        description: 'action 1',
        type: random.oneOf(undefined, 'button', 'foobar'),
        onClick: () => {}
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
      <DefaultRowAction {...props} />
    );

    expect(component).toMatchSnapshot();

  });

  test('render - icon', () => {

    const props = {
      action: {
        name: 'action1',
        description: 'action 1',
        type: 'icon',
        icon: 'trash',
        onClick: () => {}
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
      <DefaultRowAction {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
