import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTextAlign } from './text_align';

describe('EuiTextAlign', () => {
  test('is rendered', () => {
    const component = render(<EuiTextAlign {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
