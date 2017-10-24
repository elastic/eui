import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiFlexItem } from './flex_item';

describe('EuiFlexItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlexItem {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
