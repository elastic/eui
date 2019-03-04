import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiDescriptionListDescription } from './description_list_description';

describe('EuiDescriptionListDescription', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDescriptionListDescription {...requiredProps}>
        Content
      </EuiDescriptionListDescription>
    );

    expect(component).toMatchSnapshot();
  });
});
