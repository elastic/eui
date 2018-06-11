import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiSuperSelect } from './super_select';

describe('EuiSuperSelect', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuperSelect {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
