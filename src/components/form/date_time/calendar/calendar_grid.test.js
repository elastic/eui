import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCalendarGrid } from './calendar_grid';

describe('EuiCalendarGrid', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCalendarGrid {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
