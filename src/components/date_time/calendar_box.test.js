import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCalendarBox } from './calendar_box';

describe('EuiCalendarBox', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCalendarBox {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
