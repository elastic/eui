import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageContentHeader } from './page_content_header';

describe('EuiPageContentHeader', () => {
  test('is rendered', () => {
    const component = render(<EuiPageContentHeader {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
