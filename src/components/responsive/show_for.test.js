import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiShowFor } from './show_for';

describe('EuiShowFor', () => {
  test('is rendered', () => {
    const component = render(
      <EuiShowFor sizes={['xs', 's', 'm', 'l']} {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
