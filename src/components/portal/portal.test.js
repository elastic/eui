import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiPortal } from './portal';

describe('EuiPortal', () => {
  test('is rendered', () => {
    const component = render(
      <EuiPortal {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
