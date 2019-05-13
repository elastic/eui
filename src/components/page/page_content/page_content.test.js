import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageContent } from './page_content';

describe('EuiPageContent', () => {
  test('is rendered', () => {
    const component = render(<EuiPageContent {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
