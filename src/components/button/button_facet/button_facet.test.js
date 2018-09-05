import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiButtonFacet } from './button_facet';

describe('EuiButtonFacet', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonFacet {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
