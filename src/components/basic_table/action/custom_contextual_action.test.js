import React from 'react';
import { shallow } from 'enzyme/build/index';
import { CustomContextualAction } from './custom_contextual_action';

describe('CustomItemAction', () => {

  test('render', () => {

    const props = {
      action: {
        name: 'custom1',
        description: 'custom 1',
        render: () => 'test'
      },
      actionContext: { id: 'xyz' },
      enabled: true,
      visible: true
    };

    const component = shallow(
      <CustomContextualAction {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
