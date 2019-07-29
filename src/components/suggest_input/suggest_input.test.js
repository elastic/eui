import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSuggestInput } from './suggest_input';

describe('EuiSuggestInput', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuggestInput status="notYetSaved" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
