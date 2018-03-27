import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiSubSteps } from './sub_steps';

describe('EuiSubSteps', () => {
  test('is rendered', () => {
    const component = render(<EuiSubSteps {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
