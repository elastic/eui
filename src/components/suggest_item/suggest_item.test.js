import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSuggestItem } from './suggest_item';

describe('EuiSuggestItem', () => {
  test('is rendered', () => {
    const component = render(<EuiSuggestItem {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
