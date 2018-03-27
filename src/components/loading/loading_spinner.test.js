import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiLoadingSpinner } from './loading_spinner';

describe('EuiLoadingSpinner', () => {
  test('is rendered', () => {
    const component = render(<EuiLoadingSpinner {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
