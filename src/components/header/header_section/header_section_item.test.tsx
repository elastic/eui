import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiHeaderSectionItem } from './header_section_item';

describe('EuiHeaderSectionItem', () => {
  test('is rendered', () => {
    const component = render(<EuiHeaderSectionItem {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders children', () => {
    const component = render(
      <EuiHeaderSectionItem>
        <span>Call me Ishmael.</span>
      </EuiHeaderSectionItem>
    );

    expect(component).toMatchSnapshot();
  });

  describe('border', () => {
    test('defaults to left', () => {
      const component = render(<EuiHeaderSectionItem />);

      expect(component).toMatchSnapshot();
    });

    test('renders right', () => {
      const component = render(<EuiHeaderSectionItem border="right" />);

      expect(component).toMatchSnapshot();
    });
  });
});
