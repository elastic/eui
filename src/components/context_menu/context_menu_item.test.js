import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiContextMenuItem } from './context_menu_item';

describe('EuiContextMenuItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiContextMenuItem {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
