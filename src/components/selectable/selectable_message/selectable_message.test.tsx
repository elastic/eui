import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableMessage } from './selectable_message';

describe('EuiSelectableMessage', () => {
  test('is rendered', () => {
    const component = render(<EuiSelectableMessage {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
