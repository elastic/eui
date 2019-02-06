import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSpacer } from './spacer';

describe('EuiSpacer', () => {
  test('is rendered', () => {
    const component = render(<EuiSpacer {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
