import React from 'react';
import { render } from 'enzyme';

import { EuiMark } from './mark';

describe('EuiMark', () => {
  test('is rendered', () => {
    const component = render(<EuiMark>Marked</EuiMark>);

    expect(component).toMatchSnapshot();
  });
});
