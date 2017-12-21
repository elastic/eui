import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiOverlayMask } from './overlay_mask';

describe('EuiOverlayMask', () => {
  test('is rendered', () => {
    const component = render(
      <EuiOverlayMask {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
