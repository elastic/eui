import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTableHeaderButton } from './table_header_button';

describe('EuiTableHeaderButton', () => {
  test('is rendered', () => {
    const component = render(<EuiTableHeaderButton {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
