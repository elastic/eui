import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiContextMenuPanel } from './context_menu_panel';

describe('EuiContextMenuPanel', () => {
  test('is rendered', () => {
    const component = render(
      <EuiContextMenuPanel {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
