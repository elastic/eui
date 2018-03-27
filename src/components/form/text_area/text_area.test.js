import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiTextArea } from './text_area';

describe('EuiTextArea', () => {
  test('is rendered', () => {
    const component = render(<EuiTextArea {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
