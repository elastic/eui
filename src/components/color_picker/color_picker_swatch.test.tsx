import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiColorPickerSwatch } from './color_picker_swatch';

describe('EuiColorPickerSwatch', () => {
  test('is rendered', () => {
    const component = render(<EuiColorPickerSwatch {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
