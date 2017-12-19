import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../../test/required_props';

import { EuiCalendarGridItem } from './calendar_grid_item';

describe('EuiCalendarGridItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCalendarGridItem {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
