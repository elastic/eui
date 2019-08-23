import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiButtonToggle } from './button_toggle';

describe('EuiButtonToggle', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonToggle {...requiredProps} label="Label me" />
    );

    expect(component).toMatchSnapshot();
  });
});
