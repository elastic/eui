import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiFlexGrid } from './flex_grid';

describe('EuiFlexGrid', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlexGrid columns={3} {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
