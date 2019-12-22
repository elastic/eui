import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageContentHeaderSection } from './page_content_header_section';

describe('EuiPageContentHeaderSection', () => {
  test('is rendered', () => {
    const component = render(
      <EuiPageContentHeaderSection {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
