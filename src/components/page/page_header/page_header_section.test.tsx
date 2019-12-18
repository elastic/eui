import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageHeaderSection } from './page_header_section';

describe('EuiPageHeaderSection', () => {
  test('is rendered', () => {
    const component = render(<EuiPageHeaderSection {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
