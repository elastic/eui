import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSuggestInput } from './suggest_input';

describe('EuiSuggestInput', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuggestInput {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
