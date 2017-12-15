import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTimeSelector } from './time_selector';

describe('EuiTimeSelector', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTimeSelector {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
