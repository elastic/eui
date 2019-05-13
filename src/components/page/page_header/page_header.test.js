import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageHeader } from './page_header';

describe('EuiPageHeader', () => {
  test('is rendered', () => {
    const component = render(<EuiPageHeader {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
