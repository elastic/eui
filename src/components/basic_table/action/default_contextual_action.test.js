import React from 'react';
import { shallow } from 'enzyme/build/index';
import { DefaultContextualAction } from './default_contextual_action';
import { Random } from '../../../services/random';

const random = new Random();

describe('DefaultItemAction', () => {

  test('render - button', () => {

    const props = {
      action: {
        name: 'action1',
        description: 'action 1',
        type: random.oneOf(undefined, 'button'),
        onClick: () => {}
      },
      actionContext: { id: 'xyz' },
      enabled: true,
      visible: true
    };

    const component = shallow(
      <DefaultContextualAction {...props} />
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
      actionContext: { id: 'xyz' },
      enabled: true,
      visible: true
    };

    const component = shallow(
      <DefaultContextualAction {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
