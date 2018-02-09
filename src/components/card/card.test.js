import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiCard } from './card';

describe('EuiCard', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCard {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
