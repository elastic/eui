import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageContentBody } from './page_content_body';

describe('EuiPageContentBody', () => {
  test('is rendered', () => {
    const component = render(<EuiPageContentBody {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
