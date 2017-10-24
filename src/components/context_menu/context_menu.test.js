import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiContextMenu } from './context_menu';

describe('EuiContextMenu', () => {
  test('is rendered', () => {
    const component = render(
      <EuiContextMenu {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
