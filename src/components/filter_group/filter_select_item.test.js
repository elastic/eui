import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiFilterSelectItem } from './filter_select_item';

describe('EuiFilterSelectItem', () => {
  test('is rendered', () => {
    const component = render(<EuiFilterSelectItem {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
