import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiLoadingKibana, SIZES } from './loading_kibana';

describe('EuiLoadingKibana', () => {
  test('is rendered', () => {
    const component = render(<EuiLoadingKibana {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('size', () => {
    SIZES.forEach(size => {
      test(`${size} is rendered`, () => {
        const component = render(<EuiLoadingKibana size={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
