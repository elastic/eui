import React from 'react';
import { shallow } from 'enzyme';
import { DefaultRecordAction } from './default_record_action';
import { Random } from '../../services/random';

const random = new Random();

describe('DefaultRecordAction', () => {

  test('render - button', () => {

    const props = {
      action: {
        name: 'action1',
        description: 'action 1',
        type: random.oneOf([undefined, 'button', 'foobar']),
        onClick: () => {}
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
      <DefaultRecordAction {...props} />
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
      <DefaultRecordAction {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
