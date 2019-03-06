import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiLoadingKibana } from './loading_kibana';

describe('EuiLoadingKibana', () => {
  test('is rendered', () => {
    const component = render(<EuiLoadingKibana size="m" {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
