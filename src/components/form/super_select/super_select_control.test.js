import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiSuperSelectControl } from './super_select_control';

describe('EuiSuperSelectControl', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuperSelectControl {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
