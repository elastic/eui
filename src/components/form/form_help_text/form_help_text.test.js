import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFormHelpText } from './form_help_text';

describe('EuiFormHelpText', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormHelpText {...requiredProps}>
        This is help text.
      </EuiFormHelpText>
    );

    expect(component)
      .toMatchSnapshot();
  });
});
