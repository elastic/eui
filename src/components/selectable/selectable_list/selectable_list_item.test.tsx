import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSelectableListItem } from './selectable_list_item';

describe('EuiSelectableListItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSelectableListItem {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
