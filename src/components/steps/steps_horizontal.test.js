import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiStepsHorizontal } from './steps_horizontal';

describe('EuiStepsHorizontal', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStepsHorizontal {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
