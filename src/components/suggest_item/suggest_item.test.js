import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSuggestItem } from './suggest_item';

const TYPE = {
  icon: 'search',
  color: 'primary',
};

describe('EuiSuggestItem', () => {
  test('is rendered', () => {
    const component = render(<EuiSuggestItem {...requiredProps} type={TYPE} />);

    expect(component).toMatchSnapshot();
  });
});
