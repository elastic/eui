import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableList } from './selectable_list';

describe('EuiSelectableList', () => {
  test('is rendered', () => {
    const component = render(<EuiSelectableList {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
