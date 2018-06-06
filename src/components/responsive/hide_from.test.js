import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiHideFrom } from './hide_from';

describe('EuiHideFrom', () => {
  test('is rendered', () => {
    const component = render(
      <EuiHideFrom sizes={['xs', 's', 'm', 'l']} {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
