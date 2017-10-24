import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiFlexGroup } from './flex_group';

describe('EuiFlexGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlexGroup {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
