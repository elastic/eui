import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiButtonGroup } from './button_group';

describe('EuiButtonGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonGroup onChange={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
